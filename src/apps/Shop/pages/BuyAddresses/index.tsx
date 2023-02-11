import {mdiPlus} from '@mdi/js';

import Button from 'apps/Shop/components/Button';
import EmptyText from 'apps/Shop/components/EmptyText';
import {SFC} from 'system/types';

import Address from './Address';
import * as S from './Styles';

const BuyAddresses: SFC = ({className}) => {
  const renderAddAddressButton = () => {
    return <Button iconLeft={mdiPlus} onClick={() => {}} text="Add" />;
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
