import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {SFC} from 'system/types';

const data = [
  {
    cancelled: 1,
    createdDate: 'Jan 8, 2023',
    filled: 5,
  },
  {
    cancelled: 2,
    createdDate: 'Jan 9, 2023',
    filled: 10,
  },
  {
    cancelled: 2,
    createdDate: 'Jan 10, 2023',
    filled: 9,
  },
  {
    cancelled: 3,
    createdDate: 'Jan 11, 2023',
    filled: 15,
  },
  {
    cancelled: 2,
    createdDate: 'Jan 12, 2023',
    filled: 16,
  },
  {
    cancelled: 3,
    createdDate: 'Jan 13, 2023',
    filled: 12,
  },
  {
    cancelled: 2,
    createdDate: 'Jan 14, 2023',
    filled: 14,
  },
];

const StackedBarChart: SFC = ({className}) => {
  return (
    <ResponsiveContainer className={className} height={260} width="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="filled" stackId="a" fill="#34c38f" />
        <Bar dataKey="cancelled" stackId="a" fill="#f46a6a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
