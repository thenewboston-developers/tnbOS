import {useSelector} from 'react-redux';

import EditButton from 'apps/SpeedTest/components/EditButton';
import SpacedItems from 'apps/SpeedTest/components/SpacedItems';
import TopCard from 'apps/SpeedTest/components/TopCard';
import AccountModal from 'apps/SpeedTest/modals/AccountModal';
import NetworkModal from 'apps/SpeedTest/modals/NetworkModal';
import {getActiveAccountNumber, getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const activeNetworkId = useSelector(getActiveNetworkId);

  const renderAccountContent = () => {
    if (!activeAccountNumber) return <S.Button onClick={toggleAccountModal}>Select Account</S.Button>;
    return renderActiveAccount();
  };

  const renderAccountModal = () => {
    if (!accountModalIsOpen) return null;
    return <AccountModal close={toggleAccountModal} />;
  };

  const renderActiveAccount = () => {
    return (
      <SpacedItems
        leftContent={<S.AccountIdentification accountNumber={activeAccountNumber!} />}
        rightContent={<EditButton onClick={toggleAccountModal} />}
      />
    );
  };

  const renderActiveNetwork = () => {
    return (
      <SpacedItems
        leftContent={<S.NetworkIdentification networkId={activeNetworkId!} />}
        rightContent={<EditButton onClick={toggleNetworkModal} />}
      />
    );
  };

  const renderNetworkContent = () => {
    if (!activeNetworkId) return <S.Button onClick={toggleNetworkModal}>Select Network</S.Button>;
    return renderActiveNetwork();
  };

  const renderNetworkModal = () => {
    if (!networkModalIsOpen) return null;
    return <NetworkModal close={toggleNetworkModal} />;
  };

  return (
    <>
      <S.Container className={className}>
        <TopCard heading="Account">{renderAccountContent()}</TopCard>
        <TopCard heading="Network">{renderNetworkContent()}</TopCard>
      </S.Container>
      {renderAccountModal()}
      {renderNetworkModal()}
    </>
  );
};

export default Top;
