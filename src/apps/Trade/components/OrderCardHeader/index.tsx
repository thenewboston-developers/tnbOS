import {SFC} from 'system/types';
import * as S from './Styles';

export interface OrderCardHeaderProps {
  number: number;
  text: string;
}

const OrderCardHeader: SFC<OrderCardHeaderProps> = ({className, number, text}) => {
  return (
    <S.Container className={className}>
      <S.Bubble>
        <S.BubbleNumber>{number}</S.BubbleNumber>
      </S.Bubble>
      <S.Text>{text}</S.Text>
    </S.Container>
  );
};

export default OrderCardHeader;
