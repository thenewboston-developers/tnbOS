import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getAddresses} from 'apps/Shop/selectors/state';
import {SFC} from 'system/types';

import AddressSelectCard from './AddressSelectCard';
import * as S from './Styles';

interface AddressSelectModalProps {
  close(): void;
}

const AddressSelectModal: SFC<AddressSelectModalProps> = ({className, close}) => {
  const addresses = useSelector(getAddresses);

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const handleClick = () => {
    console.log('Click');
  };

  const renderAddressSelectCards = () => {
    const _addresses = addressList.map((address) => <AddressSelectCard address={address} key={address.addressId} />);
    return <S.AddressSelectCards>{_addresses}</S.AddressSelectCards>;
  };

  return (
    <S.Modal className={className} close={close} header="Select Address">
      {renderAddressSelectCards()}
      <S.Button onClick={handleClick} text="Submit" />
    </S.Modal>
  );
};

export default AddressSelectModal;
