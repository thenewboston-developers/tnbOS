import {SFC} from 'system/types';
import * as S from './Styles';

export interface OrderPaymentHeaderProps {
  number: number;
  text: string;
}

const OrderPaymentHeader: SFC<OrderPaymentHeaderProps> = ({className, number, text}) => {
  return (
    <S.Container className={className}>
      <S.Bubble>
        <S.BubbleNumber>{number}</S.BubbleNumber>
      </S.Bubble>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default OrderPaymentHeader;
