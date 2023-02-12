import {getName} from 'country-list';

import {Address} from 'apps/Shop/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AddressSelectCardProps {
  address: Address;
}

const AddressSelectCard: SFC<AddressSelectCardProps> = ({address, className}) => {
  const {address1, address2, city, countryCode, fullName, state, zipCode} = address;

  const renderCountryName = () => {
    return <div>{getName(countryCode)}</div>;
  };

  return (
    <S.Container className={className}>
      <div>{fullName}</div>
      <div>{address1}</div>
      {address2 ? <div>{address2}</div> : null}
      <div>
        {city}, {state}
      </div>
      <div>{zipCode}</div>
      {renderCountryName()}
    </S.Container>
  );
};

export default AddressSelectCard;
