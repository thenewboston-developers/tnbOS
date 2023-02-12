import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface OrderPaymentContentProps {
  children: ReactNode;
}

const OrderPaymentContent: SFC<OrderPaymentContentProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default OrderPaymentContent;
