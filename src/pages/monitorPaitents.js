import React, { useEffect, useState } from "react";


import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
import PaitentInfo from "../components/paitentInfo";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { Badge, Tabs } from 'antd';
import UpComingAppointments from "../components/upcomingAppointments";
import MissedAppointments from "../components/missedAppointments";












const getAge = (birthDate) => {
  let today = dayjs();
  let birth = dayjs(birthDate);

  let age = today.year() - birth.year();
  let monthDiff = today.month() - birth.month();

  // If the current month is before the birth month, or it's the birth month but the day is before the birth day, subtract a year from the age
  if (monthDiff < 0 || (monthDiff === 0 && today.date() < birth.date())) {
    age--;
  }

  return age;
}

async function GetPaitents(no = "T100") {
  let atrPaitents = [];
  let paitent = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/atrPatient/" + no)
  paitent = paitent.patient

  const age = getAge(paitent.birthDate)
  const res = {
    ...paitent,
    age: age,
  }
  return res



}

function strTODate(date) {
  
  if(date)
    return  new Date(date)
  else
  return null
  }
  

function PersonalDetail(props) {

  const atrNo = props.atrNo


  const navigate = useNavigate()

  const { data, isLoading, error } = useAsyncData(async () => {

    const x = await GetPaitents(atrNo)
    return x
  }, [])




  if (isLoading) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }
  console.log(error)
  return (
    <div className={props.className} style={props.style}>

      <PaitentInfo data={data} className={" w-full h-full"} />
    </div>
  );
}









function NewVisit(props) {
  const atrNo = props.atrNo




  const [formData, setFormData] = useState({
    atrNumber: "",
    patientName: "",
    drug: [],
    otherDrug: "",
    pillNumber: 0,
    visitDate: "",
    onTime: false,
    nextAppointmentDate: "",
  });

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      if (checked) {
        return { ...prevData, drug: [...prevData.drug, value] };
      } else {
        return {
          ...prevData,
          drug: prevData.drug.filter((drug) => drug !== value),
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={props.className} style={props.style}>
      <div className="pt-6">

        <div className="p-4 bg-white rounded-md shadow-md">
          <h1 className="flex justify-center mb-4 text-lg font-semibold">
            Create Visit History
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row gap-80">
              <div className="mb-4">
                <label
                  htmlFor="atrNumber"
                  className="block text-lg font-medium text-gray-700"
                >
                  ATR Number
                </label>
                <input
                  type="text"
                  id="atrNumber"
                  name="atrNumber"
                  value={formData.atrNumber}
                  onChange={handleChange}
                  className="p-2 border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="patientName"
                  className="block text-lg font-medium text-gray-700"
                >
                  User Id
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className="p-2 border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row gap-16">
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                  Drug
                </label>
                <div>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="drug"
                      value="TDF/3TC/DTG"
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-500 form-checkbox"
                    />
                    <span className="ml-2 text-lg">TDF/3TC/DTG</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="checkbox"
                      name="drug"
                      value="TDF/3TC/DTG 600"
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-500 form-checkbox"
                    />
                    <span className="ml-2 text-lg">TDF/3TC/DTG 600</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="checkbox"
                      name="drug"
                      value="TDF/3TC/DTG 400"
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-500 form-checkbox"
                    />
                    <span className="ml-2 text-lg">TDF/3TC/DTG 400</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="checkbox"
                      name="drug"
                      value="ZDV/3TC/DTG"
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-500 form-checkbox"
                    />
                    <span className="ml-2 text-lg">ZDV/3TC/DTG</span>
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="otherDrug"
                  className="block text-lg font-medium text-gray-700"
                >
                  Other Drug
                </label>
                <input
                  type="text"
                  id="otherDrug"
                  name="otherDrug"
                  value={formData.otherDrug}
                  onChange={handleChange}
                  className="p-2 border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row gap-80">
              <div className="mb-4">
                <label
                  htmlFor="pillNumber"
                  className="block text-lg font-medium text-gray-700"
                >
                  Pill Number
                </label>
                <input
                  type="number"
                  id="pillNumber"
                  name="pillNumber"
                  value={formData.pillNumber}
                  onChange={handleChange}
                  className="p-2 border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="visitDate"
                  className="block text-lg font-medium text-gray-700"
                >
                  Visit Date
                </label>
                <input
                  type="date"
                  id="visitDate"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="p-2 text-lg border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row gap-96">
              <div className="mb-4">
                <label className="block mb-2 text-lg font-medium text-gray-700">
                  On Time
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="onTime"
                    checked={formData.onTime}
                    onChange={(e) =>
                      setFormData({ ...formData, onTime: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-500 form-checkbox"
                  />
                  <span className="ml-2 text-lg">Yes</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    name="onTime"
                    onChange={(e) =>
                      setFormData({ ...formData, onTime: !e.target.checked })
                    }
                    className="w-4 h-4 text-blue-500 form-checkbox"
                  />
                  <span className="ml-2 text-lg">No</span>
                </label>
              </div>
              <div className="mb-4 ml-48">
                <label
                  htmlFor="nextAppointmentDate"
                  className="block text-lg font-medium text-gray-700"
                >
                  Next Appointment Date
                </label>
                <input
                  type="date"
                  id="nextAppointmentDate"
                  name="nextAppointmentDate"
                  value={formData.nextAppointmentDate}
                  onChange={handleChange}
                  className="p-2 text-lg border rounded outline-none w-96 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="px-8 py-2 text-lg text-white bg-green-800 rounded-md "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );




}




function MonitorPaitents(props) {


const [upcomingCount, setUpcomingCount]=useState(0)
const [missedCount, setMissedCount]=useState(0)

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: '1',
      label: <Badge color="green"  showZero count={upcomingCount} offset={[10,0]}>
        Up coming appointments </Badge>,
      children: <UpComingAppointments setCount={setUpcomingCount} />
    },
    {
      key: '2',
      label:  <Badge color="red"  showZero count={missedCount} offset={[10,0]}>Missed appointments</Badge>,
      children: <MissedAppointments setCount={setMissedCount}  />
      ,
    },
 
  ];



  return (
    <div className={props.className} style={props.style}>

      <div className="p-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </div>
  )
}



export default MonitorPaitents;