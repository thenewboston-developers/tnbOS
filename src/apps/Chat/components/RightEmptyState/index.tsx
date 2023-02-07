import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import {AccountManagerRegistration} from 'apps/AccountManager/registration';
import * as S from 'apps/Chat/components/_EmptyState/Styles';
import {useNonContactAccounts} from 'apps/Chat/hooks';
import AddContactModal from 'apps/Chat/modals/AddContactModal';
import {NetworkManagerRegistration} from 'apps/NetworkManager/registration';
import {useToggle} from 'system/hooks';
import {getAccounts, getNetworks} from 'system/selectors/state';
import {setActiveApp} from 'system/store/manager';
import {AppDispatch, SFC} from 'system/types';

const RightEmptyState: SFC = ({className}) => {
  const [addContactModalIsOpen, toggleAddContactModal] = useToggle(false);
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);
  const nonContactAccounts = useNonContactAccounts();

  const handleAddAccountClick = () => {
    dispatch(setActiveApp(AccountManagerRegistration.appId));
  };

  const handleAddNetworkClick = () => {
    dispatch(setActiveApp(NetworkManagerRegistration.appId));
  };

  const renderAddContactModal = () => {
    if (!addContactModalIsOpen) return null;
    return <AddContactModal close={toggleAddContactModal} nonContactAccounts={nonContactAccounts} />;
  };

  const renderContent = () => {
    if (isEmpty(networks)) return renderEmptyNetworks();
    if (isEmpty(accounts)) return renderEmptyAccounts();
    return renderEmptyContacts();
  };

  const renderEmptyAccounts = () => (
    <>
      <S.H3>No accounts</S.H3>
      <S.Bottom>
        <S.HelperText>Connect to another device to begin chatting.</S.HelperText>{' '}
        <S.ActionText onClick={handleAddAccountClick}>Add an account.</S.ActionText>
      </S.Bottom>
    </>
  );

  const renderEmptyContacts = () => (
    <>
      <S.H3>Nothing here!</S.H3>
      <S.Bottom>
        <S.HelperText>There are no messages to display.</S.HelperText>{' '}
        {!isEmpty(nonContactAccounts) && (
          <S.ActionText onClick={toggleAddContactModal}>Create a new chat.</S.ActionText>
        )}
      </S.Bottom>
    </>
  );

  const renderEmptyNetworks = () => (
    <>
      <S.H3>No network</S.H3>
      <S.Bottom>
        <S.HelperText>Join a network to communicate with other devices.</S.HelperText>{' '}
        <S.ActionText onClick={handleAddNetworkClick}>Add a network.</S.ActionText>
      </S.Bottom>
    </>
  );

  return (
    <>
      <S.Container className={className}>{renderContent()}</S.Container>
      {renderAddContactModal()}
    </>
  );
};

export default RightEmptyState;
