import {getName} from 'country-list';

import {Address} from 'apps/Shop/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface AddressSelectCardProps {
  address: Address;
  isSelected: boolean;
  onClick: GenericVoidFunction;
}

const AddressSelectCard: SFC<AddressSelectCardProps> = ({address, className, isSelected, onClick}) => {
  const {address1, address2, city, countryCode, fullName, state, zipCode} = address;

  const renderCountryName = () => {
    return <div>{getName(countryCode)}</div>;
  };

  return (
    <S.Container className={className} isSelected={isSelected} onClick={onClick}>
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
