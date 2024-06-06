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
import { Card, Form, Modal, Popconfirm, Radio, Select } from "antd";
import { Hotel, Person } from "@mui/icons-material";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";


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
  
occupied=occupied.bookedBeds.sort((a, b) => a.bed.bedNumber.localeCompare(b.bed.bedNumber));
free= free.unoccupiedBeds.sort((a, b) => a.bedNumber.localeCompare(b.bedNumber));
free.map(())

return({occupied:occupied,free:free})







}

const UpdateUser = (props) => {
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState(false)
  const [update, setupdate] = useState(false)
  const [loginLoading, setLoginLoading] = useState(false)


function runUpdate (){
  setupdate(!update)
}

  const [signUpForm] = Form.useForm()


  const { data, isLoading, error } = useAsyncData(async () => {

    const x = await getBeds()
   

    return x
  }, [update])

  
  
   


  if (isLoading) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }



  return (
    <div className={props.className} style={props.style} >
      <div className="flex flex-col space-y-3">

        <Radio.Group
          buttonStyle='solid'
          className='w-full space-x-1'
          defaultValue={"All"}


        >
          {['All', 'Free', 'Occupied'].map((type) => (


            <Radio.Button
              className="w-[10%]"
              key={type}

              value={type}


            >{type}</Radio.Button>

          ))}

        </Radio.Group>
        <div className="grid w-full h-full grid-cols-4 gap-6 p-4 overflow-y-scroll ">

          <Card
          onClick={()=>{


            
          }}
            hoverable
            className="shadow-md "
          >
            <div className="flex flex-col space-y-4">
              <div className="flex w-full space-x-2">
                <p>Bed 1</p>
                {true ? <Hotel className="!ml-auto" color="primary" /> :
                  <Person className="!ml-auto" color="error" />}


              </div>
              <div className="flex space-x-2">
                <p className='text-sm font-medium text-gray-500'> Status:</p>
                <p className='text-sm text-gray-900'> {"asdad"}</p>


              </div>
              <div className="flex space-x-2">
                <p className='text-sm font-medium text-gray-500'> Patient Name:</p>
                <p className='text-sm text-gray-900'> {"asdad"}</p>


              </div>
              <div className="flex space-x-2">
                <p className='text-sm font-medium text-gray-500'> Sex:</p>
                <p className='text-sm text-gray-900'> {"asdad"}</p>


              </div>
              <div className="flex space-x-2">
                <p className='text-sm font-medium text-gray-500'> Age:</p>
                <p className='text-sm text-gray-900'> {"asdad"}</p>


              </div>
              <div className="flex space-x-2">
                <p className='text-sm font-medium text-gray-500'> Admission Date:</p>
                <p className='text-sm text-gray-900'> {"asdad"}</p>


              </div>
            </div>


          </Card>
          


        </div>

      </div >
    </div>

  );
};

export default UpdateUser;
