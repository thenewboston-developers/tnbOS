import {useDispatch} from 'react-redux';
import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import EmptyText from 'apps/Shop/components/EmptyText';
import {setActiveBuyAddressId, setActivePage} from 'apps/Shop/store/manager';
import {Page} from 'apps/Shop/types';
import {AppDispatch, SFC} from 'system/types';

import Address from './Address';
import * as S from './Styles';

const BuyAddresses: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddAddressClick = () => {
    dispatch(setActiveBuyAddressId(null));
    dispatch(setActivePage(Page.buyAddressDetails));
  };

  const renderAddAddressButton = () => {
    return <Button iconLeft={mdiPlus} onClick={handleAddAddressClick} text="Add" />;
  };

  const renderAddresses = () => {
    const _addresses = [1, 2, 3, 4].map((item) => <Address key={item} />);
    return <S.Addresses>{_addresses}</S.Addresses>;
  };

  const renderContent = () => {
    if (!![1, 2, 3, 4].length) return renderAddresses();
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
