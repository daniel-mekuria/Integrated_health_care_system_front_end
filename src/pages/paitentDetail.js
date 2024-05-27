import React, { useEffect, useState } from "react";


import httpRequest from "../components/httpRequest";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import { useNavigate } from "react-router-dom";
import PaitentInfo from "../components/paitentInfo";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';

import { Tabs } from 'antd';
import ViewHistory from "../components/visitHistory";
import NewVIsit from "../components/newVisit";











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

async function GetPaitents(no) {
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


  return new Date(date)
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

      <PaitentInfo data={data}  className={" w-full h-full"} />
    </div>
  );
}













function PaitentDetail(props) {


  let location = useLocation();
  let foundData= location.state.foundData
  console.log(foundData)
  let atrNo = foundData.id;
  

  

  const items = [
    {
      key: '1',
      label: 'Personal Details',
      children: <PersonalDetail atrNo={atrNo} />
    },
    {
      key: '2',
      label: 'History',
      children: <ViewHistory  paitent={foundData} />,
    },
    {
      key: '3',
      label: 'New visit',
      children: <NewVIsit paitent={foundData} />,
    },
  ];



  return (
    <div className={props.className} style={props.style}>

      <div className="p-4">
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  )
}



export default PaitentDetail;