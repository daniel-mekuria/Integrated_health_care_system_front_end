import React from 'react'
import DrugDispensalForm from "../components/Drug_Dispensal_Form";
import Navigation from "../components/Navigation";
import Buttons from "../components/Buttons";
import Header from "../components/Header";

const Emergency_Drug_Dispensal = (props) => {
  return (
    <div  className={props.className} style={props.style}>

    <div className="flex flex-col h-screen">
    
    <div className="flex flex-grow">
      <div className="flex flex-col justify-start ml-20">
        <Buttons className="mb-10" /> 
        <div className="mt-10"> 
          <DrugDispensalForm className="" />
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Emergency_Drug_Dispensal