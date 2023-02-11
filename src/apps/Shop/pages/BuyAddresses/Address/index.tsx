import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import AddressCard from 'apps/Shop/components/AddressCard';
import {unsetAddress} from 'apps/Shop/store/addresses';
import {setActiveBuyAddressId, setActivePage} from 'apps/Shop/store/manager';
import {Address as TAddress, Page} from 'apps/Shop/types';
import DropdownMenu from 'system/components/DropdownMenu';
import {AppDispatch, SFC, ToastType} from 'system/types';
import {displayToast} from 'system/utils/toast';

export interface AddressProps {
  address: TAddress;
}

const Address: SFC<AddressProps> = ({address, className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleEditClick = () => {
    dispatch(setActiveBuyAddressId(address.addressId));
    dispatch(setActivePage(Page.buyAddressDetails));
  };

  const handleDeleteClick = () => {
    dispatch(unsetAddress(address.addressId));
    displayToast(`Product deleted`, ToastType.success);
  };

  const renderDropdownMenu = () => {
    const menuOptions = [
      {label: 'Edit', onClick: handleEditClick},
      {label: 'Delete', onClick: handleDeleteClick},
    ];

    return <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />;
  };

  return <AddressCard address={address} className={className} rightContent={renderDropdownMenu()} />;
};

export default Address;
