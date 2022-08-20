import {useNonContactAccounts} from 'apps/Chat/hooks';
import AddContactModal from 'apps/Chat/modals/AddContactModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const EmptyState: SFC = ({className}) => {
  const [addContactModalIsOpen, toggleAddContactModal] = useToggle(false);
  const nonContactAccounts = useNonContactAccounts();

  const renderAddContactModal = () => {
    if (!addContactModalIsOpen) return null;
    return <AddContactModal close={toggleAddContactModal} nonContactAccounts={nonContactAccounts} />;
  };

  return (
    <>
      <S.Container className={className}>
        <S.H3>Nothing here!</S.H3>
        <S.Bottom>
          <S.HelperText>There are no messages to display.</S.HelperText>{' '}
          <S.ActionText onClick={toggleAddContactModal}>Create a new chat.</S.ActionText>
        </S.Bottom>
      </S.Container>
      {renderAddContactModal()}
    </>
  );
};

export default EmptyState;
