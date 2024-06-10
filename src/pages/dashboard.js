import React, { useState } from "react";
import Pie from "../components/pieChartDash";

import PaitentTable from "../components/PaitentsTable";
import Line_Chart from "../components/lineChartDash";
import useAsyncData from "../components/useAsyncData";
import LoadingSpinners from "../components/loadingSpinners";
import httpRequest from "../components/httpRequest";
import { GetCookie } from "../components/cookies";
import FixPassword from "./fixPassword";



async function GetPaitents() {
  const allPaitents = await httpRequest(process.env.REACT_APP_BASE_URL + "/v1/patient/allAtrPatients")

  allPaitents.patients.forEach(async paitent => {
    const today = new Date();
    const birthDate = new Date(paitent.birthDate)
    const age = today.getFullYear() - birthDate.getFullYear() - (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()));

paitent.id=paitent.atrNumber
paitent.age=age

paitent.LastAptDate=paitent.visitDate
paitent.NextAptDate= paitent.nextAppointmentDate
   
  });

  return allPaitents.patients


}


function Dashboard(props) {


  const { data, isLoading, error } = useAsyncData(GetPaitents,[]);
  const [isFixModalOpen, setIsFixModalOpen]= useState(

    GetCookie("passwordReset")?JSON.parse(GetCookie("passwordReset")):false

    
  )



  if (isLoading || error) {
    return (
      <LoadingSpinners size={3} className={"w-full h-full"} />
    )
  }
  return (
    <div className={props.className} style={props.style}>

<FixPassword isOpen={isFixModalOpen} setIsOpen={setIsFixModalOpen}  />

      <div className="flex flex-col w-full h-full space-y-2">

          
            <div className="grid h-[30%] w-full grid-cols-1  md:grid-cols-2 ">
              <Line_Chart data={data}/>
              <Pie  data={data} />
            </div>

        <div className=" h-[65%]">
          <PaitentTable data={data} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;













  
