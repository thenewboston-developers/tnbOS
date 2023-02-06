import orderBy from 'lodash/orderBy';

import {Accounts, SFC} from 'system/types';
import AccountCard from './AccountCard';
import * as S from './Styles';

interface AddContactModalProps {
  close(): void;
  nonContactAccounts: Accounts;
}

const AddContactModal: SFC<AddContactModalProps> = ({className, close, nonContactAccounts}) => {
  const renderAccountCardsContainer = () => {
    const accountsList = Object.values(nonContactAccounts);
    const orderedAccounts = orderBy(accountsList, ['displayName']);

    const accountCards = orderedAccounts.map(({accountNumber}) => (
      <AccountCard accountNumber={accountNumber} close={close} key={accountNumber} />
    ));

    return <S.AccountCardsContainer>{accountCards}</S.AccountCardsContainer>;
  };

  return (
    <S.Modal className={className} close={close} header="New Chat">
      {renderAccountCardsContainer()}
    </S.Modal>
  );
};

export default AddContactModal;
