import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {getResolutions} from 'apps/Trade/selectors/state';
import {colors} from 'apps/Trade/styles';
import {FillStatus, Order, ResolutionStatus} from 'apps/Trade/types';
import {SFC} from 'system/types';

export interface StackedBarChartProps {
  orderList: Order[];
}

const StackedBarChart: SFC<StackedBarChartProps> = ({className, orderList}) => {
  const resolutions = useSelector(getResolutions);

  const data = useMemo(() => {
    const results = orderList.reduce((previousValue: any, order) => {
      const createdDate = new Date(order.createdDate).toLocaleDateString(undefined, {dateStyle: 'short'});
      const dateStr = createdDate.toString();
      const resolution = resolutions[order.orderId];

      const isCancelled = !!resolution && resolution.resolutionStatus === ResolutionStatus.cancelled;
      const isFilled = order.fillStatus === FillStatus.complete;

      if (!isCancelled && !isFilled) return previousValue;

      if (previousValue[dateStr]) {
        previousValue[dateStr].cancelled += isCancelled ? 1 : 0;
        previousValue[dateStr].filled += isFilled ? 1 : 0;
      } else {
        previousValue[dateStr] = {
          cancelled: isCancelled ? 1 : 0,
          createdDate: dateStr,
          filled: isFilled ? 1 : 0,
        };
      }

      return previousValue;
    }, {});

    return Object.values(results).slice(0, 7).reverse();
  }, [orderList, resolutions]);

  return (
    <ResponsiveContainer className={className} height={260} width="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="createdDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="filled" fill="#34c38f" stackId="a" />
        <Bar dataKey="cancelled" fill={colors.palette.red['300']} stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;
