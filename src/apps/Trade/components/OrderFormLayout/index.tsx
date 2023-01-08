import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

interface OrderFormLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

const OrderFormLayout: SFC<OrderFormLayoutProps> = ({className, left, right}) => {
  return (
    <S.Container className={className}>
      <S.Left>{left}</S.Left>
      <S.Right>{right}</S.Right>
    </S.Container>
  );
};

export default OrderFormLayout;
