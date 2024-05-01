import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const Line_Chart = (props) => {
  return (
    <div className={props.className}>
    <div className="flex flex-col">
      <div className="border p-4 mb-1 w-500">
        <h2 className="font-light">Patient Amount</h2>
        <h1 className="text-4xl">2343</h1>
        <p >Patient Number vs Month</p>
      </div>
      <div className="border p-4 w-500">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
          width={500}
          height={175}
        />
      </div>
    </div>
    </div>
  );
};

export default Line_Chart;
