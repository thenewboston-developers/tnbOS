import {useDispatch} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {setContact} from 'apps/Chat/store/contacts';
import {Accounts, AppDispatch, OnlineStatus, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

interface AddContactModalProps {
  accounts: Accounts;
  close(): void;
}

const AddContactModal: SFC<AddContactModalProps> = ({accounts, className, close}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddContact = (accountNumber: string) => {
    dispatch(
      setContact({
        accountNumber,
        lastActivityDate: currentSystemDate(),
      }),
    );
    close();
  };

  const renderAccountCards = () => {
    const accountsList = Object.values(accounts);
    const orderedAccounts = orderBy(accountsList, ['displayName']);

    const accountCards = orderedAccounts.map(({accountNumber, displayImage, displayName}) => (
      <S.AccountCard key={accountNumber}>
        <Avatar displayImage={displayImage} onlineStatus={OnlineStatus.online} />
        <S.AccountCardText>
          <S.DisplayName>{displayName}</S.DisplayName>
          <S.AccountNumber>{truncate(accountNumber, 24)}</S.AccountNumber>
        </S.AccountCardText>
        <Button color={ButtonColor.success} onClick={() => handleAddContact(accountNumber)} text="Add" />
      </S.AccountCard>
    ));

    return <S.AccountCardContainer>{accountCards}</S.AccountCardContainer>;
  };

  return (
    <S.Modal className={className} close={close} header="New Chat">
      {renderAccountCards()}
    </S.Modal>
  );
};

export default AddContactModal;
