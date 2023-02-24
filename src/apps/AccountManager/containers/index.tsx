import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import AccountsEmptyStateGraphic from 'apps/AccountManager/assets/accounts-empty-state.png';
import AccountModal from 'apps/AccountManager/modals/AccountModal';
import AppWindow from 'system/components/AppWindow';
import EmptyPage from 'system/components/EmptyPage';
import {useToggle} from 'system/hooks';
import {getAccounts} from 'system/selectors/state';
import {AppProps, SFC} from 'system/types';
import MainArea from './MainArea';
import Top from './Top';
import * as S from './Styles';

const AccountManager: SFC<AppProps> = ({className, display}) => {
  const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
  const accounts = useSelector(getAccounts);

  if (!display) return null;

  const renderEmptyPage = () => {
    return (
      <EmptyPage
        actionText="Add an account."
        bottomText="Accounts are how devices on the network are identified."
        graphic={AccountsEmptyStateGraphic}
        onActionTextClick={toggleAccountModal}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (isEmpty(accounts)) return renderEmptyPage();
    return (
      <>
        <Top />
        <MainArea />
      </>
    );
  };

  return (
    <>
      <AppWindow className={className} display={display}>
        <S.AppContainer>{renderPageContent()}</S.AppContainer>
      </AppWindow>
      {accountModalIsOpen ? <AccountModal close={toggleAccountModal} /> : null}
    </>
  );
};

export default AccountManager;
