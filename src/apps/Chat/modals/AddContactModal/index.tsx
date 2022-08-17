import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {getContacts} from 'apps/Chat/selectors/state';
import {setContact} from 'apps/Chat/store/contacts';
import {getAccounts} from 'system/selectors/state';
import {AppDispatch, OnlineStatus, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

interface AddContactModalProps {
  close(): void;
}

const AddContactModal: SFC<AddContactModalProps> = ({className, close}) => {
  const accounts = useSelector(getAccounts);
  const contacts = useSelector(getContacts);
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
