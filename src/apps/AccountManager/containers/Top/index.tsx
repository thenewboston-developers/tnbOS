import AccountModal from 'apps/AccountManager/modals/AccountModal';
import AppHeader from 'system/components/AppHeader';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const Top: SFC = ({className}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);

  return (
    <>
      <AppHeader className={className}>
        <h2>Accounts</h2>
        <S.Button onClick={toggleAccountModal} text="Add Account" />
      </AppHeader>
      {accountModalIsOpen ? <AccountModal close={toggleAccountModal} /> : null}
    </>
  );
};

export default Top;
