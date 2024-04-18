import { BarChart } from '@tremor/react';

const chartdata = [
  {
    name: 'Female',
    'Number of HIV positive': 2488,
  },
  {
    name: 'Male',
    'Number of HIV positive': 1445,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString();

export const BarChartHero = () => (
  <BarChart
    data={chartdata}
    index="name"
    categories={['Number of HIV positive']}
    colors={['green']}
    valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />
);