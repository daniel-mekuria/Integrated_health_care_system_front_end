import React from 'react';
import httpRequest from './httpRequest';
import useAsyncData from "../components/useAsyncData";
import { useEffect } from 'react';
import LoadingSpinners from './loadingSpinners';
import DataTable from './DataTable';
import Info from './Info'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

async function GetPatient(atr) {
  let atrpersons = [];
  // let atr = 'T100'
  console.log('here')
  const person = await httpRequest(process.env.REACT_APP_BASE_URL + `/v1/patient/atrPatient/${atr}`)
  
  console.log(person,person.patient.atrNumber)

  
    let patient = person.patient
    console.log("saf")
    const today = new Date();
    const birthDate = new Date(patient.birthDate)
    const age = today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));


    atrpersons.push({
      id: person.atrNumber, lastName: (patient.fullName).split(" ")[1], firstName: (patient.fullName).split(" ")[0], age: age, PhoneNumber: patient.phoneNumber, onTime: "No", Medicine: "cod(codine)", LastAptDate: "10/12/2020", NextAptDate: "10/12/2020"
    },)
    console.log('aalsdfha;sdhfl')
    console.log(atrpersons,"herio")

  return atrpersons


}

// let patient=<Getpersons atr = 'T100'/>
function PersonalDetails(props){
  const navigate = useNavigate()

  // const x=httpRequest()
  const { data, isLoading, error } = useAsyncData(GetPatient('T100'));

  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }

  return (
    <div className={props.className} style={props.style}>

     
      <Info data={data} pageSize={9} className={" w-full h-full"} />
    </div>
  );


}

      



export default PersonalDetails;
