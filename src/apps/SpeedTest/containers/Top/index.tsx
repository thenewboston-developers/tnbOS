import {useSelector} from 'react-redux';
import {mdiPencil} from '@mdi/js';

import AccountIdentification from 'apps/SpeedTest/components/AccountIdentification';
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
    return renderActiveAccount();
  };

  const renderActiveAccount = () => {
    return (
      <SpacedItems
        leftContent={<AccountIdentification accountNumber={activeAccountNumber!} />}
        rightContent={
          <div onClick={toggleAccountModal}>
            <S.Icon path={mdiPencil} size="28px" />
          </div>
        }
      />
    );
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
          <SpacedItems leftContent={<div>Left</div>} rightContent={<div>Right</div>} />
        </TopCard>
      </S.Container>
      {renderAccountModal()}
    </>
  );
};

export default Top;
