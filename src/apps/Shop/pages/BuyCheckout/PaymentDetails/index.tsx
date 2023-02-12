import {useMemo} from 'react';

import {useCartProductList} from 'apps/Shop/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PaymentDetailsProps {
  isButtonDisabled: boolean;
}

const PaymentDetails: SFC<PaymentDetailsProps> = ({className, isButtonDisabled}) => {
  const cartProductList = useCartProductList();

  const totalPrice = useMemo(() => {
    return cartProductList.reduce((previousValue, product) => previousValue + product.priceAmount, 0);
  }, [cartProductList]);

  const handlePlaceOrderClick = () => {
    console.log('Place order');
  };

  return (
    <S.Container className={className}>
      <S.PriceContainer>
        <S.NetworkImage alt="display image" src="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
        <S.Amount>{totalPrice.toLocaleString()}</S.Amount>
      </S.PriceContainer>
      <S.Button disabled={isButtonDisabled} onClick={handlePlaceOrderClick} text="Place Order" />
    </S.Container>
  );
};

export default PaymentDetails;
