import {useSelector} from 'react-redux';

import {GenericVoidFunction} from 'shared/types';
import {useNetworkDisplayImage} from 'system/hooks';
import {getBalances} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface PaymentDetailsProps {
  handlePlaceOrderClick: GenericVoidFunction;
  isButtonDisabled: boolean;
  networkId: string | null;
  totalPrice: number;
}

const PaymentDetails: SFC<PaymentDetailsProps> = ({
  className,
  handlePlaceOrderClick,
  isButtonDisabled,
  networkId,
  totalPrice,
}) => {
  const balances = useSelector(getBalances);
  const networkDisplayImage = useNetworkDisplayImage(networkId);

  const balance = networkId ? balances[networkId] || 0 : 0;
  const totalPriceExceedsBalance = balance < totalPrice;

  const renderPriceError = () => {
    if (!totalPriceExceedsBalance) return null;
    return (
      <S.ErrorMessage>
        Total order price of {totalPrice.toLocaleString()} exceeds available balance of {balance.toLocaleString()}
      </S.ErrorMessage>
    );
  };

  return (
    <S.Container className={className}>
      <S.PriceContainer>
        {networkId && <S.NetworkImage alt="display image" src={networkDisplayImage} />}
        <S.Amount>{totalPrice.toLocaleString()}</S.Amount>
      </S.PriceContainer>
      <S.Button
        disabled={isButtonDisabled || totalPriceExceedsBalance}
        onClick={handlePlaceOrderClick}
        text="Place Order"
      />
      {renderPriceError()}
    </S.Container>
  );
};

export default PaymentDetails;
