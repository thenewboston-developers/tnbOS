import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';

import {getAddresses} from 'apps/Shop/selectors/state';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';

import AddressSelectCard from './AddressSelectCard';
import * as S from './Styles';

interface AddressSelectModalProps {
  close(): void;
  setAddressId: GenericVoidFunction;
}

const AddressSelectModal: SFC<AddressSelectModalProps> = ({className, close, setAddressId}) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const addresses = useSelector(getAddresses);

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const handleAddressSelectCardClick = (addressId: string) => {
    if (addressId === selectedAddressId) {
      setSelectedAddressId(null);
    } else {
      setSelectedAddressId(addressId);
    }
  };

  const handleButtonClick = () => {
    setAddressId(selectedAddressId);
    close();
  };

  const renderAddressSelectCards = () => {
    const _addresses = addressList.map((address) => (
      <AddressSelectCard
        address={address}
        key={address.addressId}
        isSelected={address.addressId === selectedAddressId}
        onClick={() => handleAddressSelectCardClick(address.addressId)}
      />
    ));

    return <S.AddressSelectCards>{_addresses}</S.AddressSelectCards>;
  };

  const renderContent = () => {
    if (!!addressList.length) return renderAddressSelectCards();
    return <S.EmptyText>No addresses to display.</S.EmptyText>;
  };

  return (
    <S.Modal className={className} close={close} header="Select Address">
      {renderContent()}
      <S.Button disabled={!selectedAddressId} onClick={handleButtonClick} text="Submit" />
    </S.Modal>
  );
};

export default AddressSelectModal;
