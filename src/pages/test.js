import React, { useState, useRef } from "react";

import Checkbox from "@mui/material/Checkbox";
import {

  Button,
  TextField,

} from "@mui/material";

import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import httpRequest from "../components/httpRequest";
import { GetCookie, SetCookie } from "../components/cookies";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Badge, Card, Form, Input, Modal, Popconfirm, Radio, Select } from "antd";
import { Hotel, Person } from "@mui/icons-material";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { ReactSVG } from "react-svg";
import { AddBed, AssignBed, EditBed } from "../components/editBed";


function convertStringToArray(str) {
  return str.split(',').map(function (item) {
    return item.trim();
  }).filter(function (item) {
    return item !== '';
  });
}


async function getBeds() {


  let occupied = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/bed/getAllBookedBeds")

  let free = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/bed/getUnoccupiedBeds")
  let patients = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")

  occupied = occupied.bookedBeds.sort((a, b) => a.bed.bedNumber.localeCompare(b.bed.bedNumber));
  free = free.unoccupiedBeds.sort((a, b) => a.bedNumber.localeCompare(b.bedNumber));
  free.map((x, index) => {
    free[index] = { bed: x, occupied: false }


  })
  occupied.map((x, index) => {
    x.occupied = true
    x.patient.age = calculateAge(x.patient.birthdate)
    x.admissionDate = dayjs(x.createdAt).format("DD-MMM-YYYY")

  })

  patients = patients.patients
  const patientIds = occupied.map(item => item.patient._id);

  const filteredPatients = patients.filter(item => !patientIds.includes(item._id));

  console.log(filteredPatients)
  return ({ occupied: occupied, free: free, patients: filteredPatients })







}

const calculateAge = (birthdate) => {
  const today = dayjs();
  const birth = dayjs(birthdate);
  const age = today.diff(birth, 'year');
  return age;
};

const UpdateUser = (props) => {
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [update, setupdate] = useState(false)
  const [bedCounts, setBedCounts] = useState([])
  const [filteredBeds, setFilteredBeds] = useState([])
  const [selectedBeds, setSelectedBeds] = useState([])
  const [isEditBedModalOpen, setIsEditBedModalOpen] = useState(false)
  const [isAssignBedModalOpen, setIsAssignBedModalOpen] = useState(false)
  const [isAddBedModalOpen, setIsAddBedModalOpen] = useState(false)
  const [bedToEdit, setBedToEdit] = useState(null)


  const [loginLoading, setLoginLoading] = useState(false)


  function runUpdate() {
    setupdate(!update)
  }



  const { data, isLoading, error } = useAsyncData(async () => {

    const x = await getBeds()

    setFilteredBeds(x.free.concat(x.occupied))
    setSelectedBeds(x.free.concat(x.occupied))
    setBedCounts([x.occupied.length + x.free.length, x.occupied.length, x.free.length])
    console.log(x.patients)
    return x
  }, [update])


  function changeType(x) {
    if (x === "All") {
      setFilteredBeds(data.free.concat(data.occupied))
      setSelectedBeds(data.free.concat(data.occupied))

    }
    else if (x === "Free") {
      setFilteredBeds(data.free)
      setSelectedBeds(data.free)

    }
    else if (x === "Occupied") {
      setFilteredBeds(data.occupied)
      setSelectedBeds(data.occupied)

    }


  }



  function handleEditBed(bed) {
    setBedToEdit(bed)
    bed.occupied ? setIsEditBedModalOpen(true) : setIsAssignBedModalOpen(true)


  }




  const requestSearch = (searchString) => {
    searchString = searchString.toLowerCase();

    function containsSearchString(value) {
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchString);
      } else if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(containsSearchString);
      }
      return false;
    }

    setFilteredBeds(selectedBeds.filter(obj => containsSearchString(obj)))
  }




  if (isLoading) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }


  return (
    <div className={props.className} style={props.style} >
      <div className="flex flex-col h-full space-y-6">

        {bedToEdit ? !bedToEdit.occupied ? <AssignBed patients={data.patients} update={runUpdate} data={bedToEdit} isOpen={isAssignBedModalOpen} setIsOpen={setIsAssignBedModalOpen} /> : <EditBed update={runUpdate} data={bedToEdit} isOpen={isEditBedModalOpen} setIsOpen={setIsEditBedModalOpen} /> : null}
        <AddBed update={runUpdate} isOpen={isAddBedModalOpen} setIsOpen={setIsAddBedModalOpen} />

        <div className="flex w-full pr-4">

          <Input className="w-[70%]" placeholder="Search ...." onChange={(x) => {
            requestSearch(x.target.value)
          }} />

          <Button className="!ml-auto" variant="contained" onClick={() => {
            setIsAddBedModalOpen(true)
          }} >+ Add bed </Button>
        </div>
        <Radio.Group
          buttonStyle='solid'
          className='w-full space-x-8'
          defaultValue={"All"}

          onChange={(x) => {
            changeType(x.target.value)
          }}
        >
          {['All', 'Free', 'Occupied'].map((type) => (

            <Badge key={type}
              color={type === "All" ? "orange" : type === "Occupied" ? "red" : "green"} className="w-[10%]"
              showZero count={type === "All" ? bedCounts[0] : type === "Occupied" ? bedCounts[1] : bedCounts[2]} offset={[10, 0]}>

              <Radio.Button
                className="w-full"

                value={type}


              >

                {type}


              </Radio.Button>
            </Badge>
          ))}

        </Radio.Group>
        <div className="grid w-full h-full grid-cols-4 gap-6 p-4 overflow-y-scroll scrollbar-hide ">

          {
            filteredBeds.map((bed) =>
              <Card
                key={bed.bed._id}

                onClick={() => {
                  handleEditBed(bed)



                }}
                hoverable
                className="shadow-md "
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex w-full space-x-2">
                    <p>Bed: {bed.bed.bedNumber}</p>
                    <div className="pt-3">
                      {bed.occupied ? <ReactSVG beforeInjection={(svg) => {
                        svg.setAttribute('style', 'width: 5.3rem; height: 5.3rem; color:#F96950;');
                      }} src="Bed.svg" /> :
                        <ReactSVG beforeInjection={(svg) => {
                          svg.setAttribute('style', 'width: 5.3rem; height: 5.3rem; color:#7EF598;');
                        }} src="BedEmpty.svg" />
                      }</div>
                    <p className='text-sm font-semibold text-gray-600'> {bed.occupied ? "In Use" : "Free"}</p>



                  </div>

                  <div className="flex space-x-2">
                    <p className='text-sm font-medium text-gray-500'> Room:</p>
                    <p className='text-sm text-gray-900'> {bed.bed.room}</p>


                  </div>
                  <div className="flex space-x-2">
                    <p className='text-sm font-medium text-gray-500'> Patient Name:</p>
                    <p className='text-sm text-gray-900'> {bed.occupied ? bed.patient.fullName : null}</p>


                  </div>
                  <div className="flex space-x-2">
                    <p className='text-sm font-medium text-gray-500'> Sex:</p>
                    <p className='text-sm text-gray-900'> {bed.occupied ? bed.patient.sex : null}</p>


                  </div>
                  <div className="flex space-x-2">
                    <p className='text-sm font-medium text-gray-500'> Age:</p>
                    <p className='text-sm text-gray-900'> {bed.occupied ? bed.patient.age : null}</p>


                  </div>
                  <div className="flex space-x-2">
                    <p className='text-sm font-medium text-gray-500'> Admission Date:</p>
                    <p className='text-sm text-gray-900'> {bed.occupied ? bed.admissionDate : null}</p>


                  </div>

                </div>


              </Card>
            )
          }



        </div>

      </div >
    </div>

  );
};

export default UpdateUser;
