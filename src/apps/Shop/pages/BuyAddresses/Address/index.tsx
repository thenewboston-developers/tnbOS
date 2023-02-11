import {useDispatch} from 'react-redux';
import {getName} from 'country-list';
import {mdiDotsVertical} from '@mdi/js';

import {Address as TAddress, Page} from 'apps/Shop/types';
import DropdownMenu from 'system/components/DropdownMenu';
import {unsetAddress} from 'apps/Shop/store/addresses';
import {setActiveBuyAddressId, setActivePage} from 'apps/Shop/store/manager';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';
import * as S from './Styles';

export interface AddressProps {
  address: TAddress;
}

const Address: SFC<AddressProps> = ({address, className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {address1, address2, addressId, city, countryCode, fullName, state, zipCode} = address;

  const handleEditClick = () => {
    dispatch(setActiveBuyAddressId(addressId));
    dispatch(setActivePage(Page.buyAddressDetails));
  };

  const handleDeleteClick = () => {
    dispatch(unsetAddress(addressId));
    displayToast(`Product deleted`, ToastType.success);
  };

  const renderCountryName = () => {
    return <div>{getName(countryCode)}</div>;
  };

  const renderDropdownMenu = () => {
    const menuOptions = [
      {label: 'Edit', onClick: handleEditClick},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
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
      <S.Right>{renderDropdownMenu()}</S.Right>
    </S.Container>
  );
};

export default Address;
