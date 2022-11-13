import {useSelector} from 'react-redux';

import SpacedItems from 'apps/SpeedTest/components/SpacedItems';
import TopCard from 'apps/SpeedTest/components/TopCard';
import AccountModal from 'apps/SpeedTest/modals/AccountModal';
import {getActiveAccountNumber} from 'apps/SpeedTest/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
  const activeAccountNumber = useSelector(getActiveAccountNumber);

  const renderAccountContent = () => {
    if (!activeAccountNumber) return <S.Button onClick={toggleAccountModal}>Select Account</S.Button>;
    return <SpacedItems />;
  };

  const renderAccountModal = () => {
    if (!accountModalIsOpen) return null;
    return <AccountModal close={toggleAccountModal} />;
  };

  return (
    <>
      <S.Container className={className}>
        <TopCard heading="Account">{renderAccountContent()}</TopCard>
        <TopCard heading="Network">
          <SpacedItems />
        </TopCard>
      </S.Container>
      {renderAccountModal()}
    </>
  );
};

export default Top;
