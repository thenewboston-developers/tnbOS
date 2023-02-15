import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import EmptyText from 'apps/Shop/components/EmptyText';
import {getAddresses} from 'apps/Shop/selectors/state';
import {setActiveBuyAddressId, setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';

import Address from './Address';
import * as S from './Styles';

const BuyAddresses: SFC = ({className}) => {
  const addresses = useSelector(getAddresses);
  const dispatch = useDispatch<AppDispatch>();

  const addressList = useMemo(() => {
    return Object.values(addresses);
  }, [addresses]);

  const handleAddAddressClick = () => {
    dispatch(setActiveBuyAddressId(null));
    dispatch(setActivePage(Page.buyAddressDetails));
  };

  const renderAddAddressButton = () => {
    return <Button iconLeft={mdiPlus} onClick={handleAddAddressClick} text="Add" />;
  };

  const renderAddresses = () => {
    const _addresses = addressList.map((address) => <Address address={address} key={address.addressId} />);
    return <S.Addresses>{_addresses}</S.Addresses>;
  };

  const renderContent = () => {
    if (!!addressList.length) return renderAddresses();
    return <EmptyText>No addresses to display.</EmptyText>;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="My Addresses" rightContent={renderAddAddressButton()} />
      {renderContent()}
    </S.Container>
  );
};

export default BuyAddresses;
