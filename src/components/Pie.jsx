import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const Pie = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="border p-4 mb-1 w-full">
        <h2>Patients by Severity Level</h2>
        <h1 className="text-4xl">5432</h1>
      </div>
      <div className="border p-4 w-full">
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'Stage 1' },
                { id: 1, value: 15, label: 'Stage 2' },
                { id: 2, value: 20, label: 'Stage 3' },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  );
};

export default Pie;
