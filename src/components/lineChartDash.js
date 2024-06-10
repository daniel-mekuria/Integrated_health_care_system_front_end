import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { countEntriesbydate, countTotalEntriesbydate } from './statUtils';
import dayjs from 'dayjs';










const Line_Chart = (props) => {




  let xData = [{ data: [0] }]
  let yData = [{ data: [0, 1] }]


  let result = (countTotalEntriesbydate(props.data, "Patients", "01/01/2024", "06/06/2024", "Month"))
  xData = [{ scaleType: 'band', data: result.x }]
  yData = result.y
  if (xData[0].data && yData[0].data) {


    if (xData[0].data.length !== yData[0].data.length) {

      xData = []
      yData = []
    }

  }
  else {
    xData = []
    yData = []
  }




  return (
    <div className={props.className}>
      <div className="flex flex-col w-full h-full ">

        <div className="p-4 mb-1 border">
          <h2 className="font-light">Patient Amount</h2>
          <h1 className="text-4xl">{props.data.length}</h1>
          <p >Patient Number vs Month</p>
        </div>

        <div className="w-full p-4 border h-52 ">
          <LineChart
            xAxis={xData}
            series={yData}

          />
        </div>

      </div>
    </div>


  );
};

export default Line_Chart;
