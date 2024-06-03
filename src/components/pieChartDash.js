import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { countTotalEntries } from './statUtils';
import dayjs from "dayjs"

const Pie = (props) => {






  

  let xData = [{data:[0]}]
  let yData = [{data:[0,1]}]

 
  let result = countTotalEntries(props.data,"paitents","1970-01-01",dayjs().format("YYYY-MM-DD") ,"time","patientStatus");

 yData=result.y
  xData = [{ scaleType: 'band', data: result.x }]

  yData = [
      {
          data: yData.map((x)=>{
return({ value:(x.data) , label: x.label })
          })
      },
  ]



  return (
    <div className={props.className}>
    <div className="flex flex-col w-full h-full ">
      
    <div className="p-4 mb-1 border">
        <h2 className="font-light">Patient by status</h2>
        <h1 className="text-4xl">{props.data.length}</h1>
        <p >Patient Number vs clinical status</p>
      </div>
      
      <div className="w-full p-4 border h-52 ">
        <PieChart
          
          series={yData}
         
        />
        </div>

        </div>
        </div>
  );
};

export default Pie;
