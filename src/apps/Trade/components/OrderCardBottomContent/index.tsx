import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface OrderCardBottomContentProps {
  children: ReactNode;
}

const OrderCardBottomContent: SFC<OrderCardBottomContentProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default OrderCardBottomContent;
