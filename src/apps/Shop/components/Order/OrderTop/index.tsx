import {Order} from 'apps/Shop/types';
import {SFC} from 'system/types';
import {useNetworkDisplayImage} from 'system/hooks';
import {longDate} from 'system/utils/dates';
import * as S from './Styles';

export interface OrderTopProps {
  order: Order;
}

const OrderTop: SFC<OrderTopProps> = ({className, order}) => {
  const networkDisplayImage = useNetworkDisplayImage(order.networkId);

  const {createdDate, total} = order;

  const renderPrice = () => {
    return (
      <S.PriceContainer>
        <S.PriceNetworkImage alt="display image" src={networkDisplayImage} />
        <S.PriceAmount>{total.toLocaleString()}</S.PriceAmount>
      </S.PriceContainer>
    );
  };

  return (
    <S.Container className={className}>
      <S.Detail>
        <S.DetailLabel>ORDER DATE</S.DetailLabel>
        <S.DetailValue>{longDate(createdDate)}</S.DetailValue>
      </S.Detail>
      <S.Detail>
        <S.DetailLabel>TOTAL</S.DetailLabel>
        <S.DetailValue>{renderPrice()}</S.DetailValue>
      </S.Detail>
    </S.Container>
  );
};

export default OrderTop;
