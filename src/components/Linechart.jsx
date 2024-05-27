import { LineChart } from '@tremor/react';

const dataFormatter = (number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export default function LineChartHero({chartData}) {
  return (
    <LineChart
      className="h-50 shrink-1"
      data={chartData}
      index="date"
      categories={['female', 'male']}
      colors={['indigo', 'rose']}
      valueFormatter={dataFormatter}
      yAxisWidth={120}
      onValueChange={(v) => console.log(v)}
    />
  );
}