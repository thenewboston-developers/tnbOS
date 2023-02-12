import {SFC} from 'system/types';
import * as S from './Styles';

const Order: SFC = ({className}) => {
  const renderBottom = () => {
    const address = {
      address1: '708 Apple Road',
      address2: 'PO Box 284',
      addressId: 'abc',
      city: 'Pittsburgh',
      countryCode: 'US',
      fullName: 'Bucky Roberts',
      state: 'PA',
      zipCode: '15101',
    };

    return (
      <S.Bottom>
        <S.AddressCard address={address} />
      </S.Bottom>
    );
  };

  const renderPrice = () => {
    return (
      <S.PriceContainer>
        <S.PriceNetworkImage alt="display image" src="https://avatars.githubusercontent.com/u/12706692?s=200&v=4" />
        <S.PriceAmount>2,600</S.PriceAmount>
      </S.PriceContainer>
    );
  };

  const renderTop = () => {
    return (
      <S.Top>
        <S.TopDetail>
          <S.TopLabel>ORDER DATE</S.TopLabel>
          <S.TopValue>February 3, 2023</S.TopValue>
        </S.TopDetail>
        <S.TopDetail>
          <S.TopLabel>TOTAL</S.TopLabel>
          <S.TopValue>{renderPrice()}</S.TopValue>
        </S.TopDetail>
      </S.Top>
    );
  };

  return (
    <S.Container className={className}>
      {renderTop()}
      {renderBottom()}
    </S.Container>
  );
};

export default Order;
