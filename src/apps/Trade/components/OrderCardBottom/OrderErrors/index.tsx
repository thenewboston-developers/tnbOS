import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getOrderErrors} from 'apps/Trade/selectors/state';
import {Order, OrderError} from 'apps/Trade/types';
import {Dict, SFC} from 'system/types';
import * as S from './Styles';

interface OrderErrorsProps {
  order: Order;
}

const OrderErrors: SFC<OrderErrorsProps> = ({className, order}) => {
  const orderErrors = useSelector(getOrderErrors);

  const errors: Dict<OrderError> | undefined = useMemo(() => {
    return orderErrors[order.orderId];
  }, [order.orderId, orderErrors]);

  const errorMessages = useMemo(() => {
    if (!errors) return null;
    const sortedErrors = orderBy(Object.values(errors), ['createdDate'], ['desc']);
    return sortedErrors.map(({orderErrorId, message}) => <S.Error key={orderErrorId}>{message}</S.Error>);
  }, [errors]);

  return errors ? <S.Container className={className}>{errorMessages}</S.Container> : null;
};

export default OrderErrors;
