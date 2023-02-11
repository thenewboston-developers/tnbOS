import {ReactNode} from 'react';
import {getName} from 'country-list';

import {Address as TAddress} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AddressCardProps {
  address: TAddress;
  rightContent?: ReactNode;
}

const AddressCard: SFC<AddressCardProps> = ({address, className, rightContent}) => {
  const {address1, address2, city, countryCode, fullName, state, zipCode} = address;

  const renderCountryName = () => {
    return <div>{getName(countryCode)}</div>;
  };

  return (
    <S.Container className={className}>
      <S.Left>
        <div>{fullName}</div>
        <div>{address1}</div>
        {address2 ? <div>{address2}</div> : null}
        <div>
          {city}, {state}
        </div>
        <div>{zipCode}</div>
        {renderCountryName()}
      </S.Left>
      <S.Right>{rightContent}</S.Right>
    </S.Container>
  );
};

export default AddressCard;
