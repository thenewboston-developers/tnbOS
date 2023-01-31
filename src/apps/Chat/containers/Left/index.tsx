import {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import {mdiChatPlus} from '@mdi/js';

import {useNonContactAccounts} from 'apps/Chat/hooks';
import AddContactModal from 'apps/Chat/modals/AddContactModal';
import {getActiveChat, getContacts} from 'apps/Chat/selectors/state';
import {Contact as TContact, Message} from 'apps/Chat/types';
import {useToggle} from 'system/hooks';
import {getAccounts} from 'system/selectors/state';
import {Dict, SFC} from 'system/types';
import Contact from './Contact';
import * as S from './Styles';

export interface LeftProps {
  unreadMessages: Dict<Message[]>;
}

const Left: SFC<LeftProps> = ({className, unreadMessages}) => {
  const [addContactModalIsOpen, toggleAddContactModal] = useToggle(false);
  const [searchText, setSearchText] = useState<string>('');
  const accounts = useSelector(getAccounts);
  const activeChat = useSelector(getActiveChat);
  const contacts = useSelector(getContacts);
  const nonContactAccounts = useNonContactAccounts();

  const contactList = Object.values(contacts);

  const filterBySearchText = (items: TContact[]): TContact[] => {
    if (!searchText) return items;
    const lowerCaseSearchText = searchText.toLowerCase();

    return items.filter(({accountNumber}) => {
      const account = accounts[accountNumber];
      return (
        account?.displayName?.toLowerCase().includes(lowerCaseSearchText) ||
        accountNumber.toLowerCase().includes(lowerCaseSearchText)
      );
    });
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const renderAddContactModal = () => {
    if (!addContactModalIsOpen) return null;
    return <AddContactModal close={toggleAddContactModal} nonContactAccounts={nonContactAccounts} />;
  };

  const renderButtonContainer = () => {
    if (isEmpty(nonContactAccounts)) return null;
    return (
      <S.ButtonContainer>
        <S.Button icon={mdiChatPlus} onClick={toggleAddContactModal} text="New Chat" />
      </S.ButtonContainer>
    );
  };

  const renderContacts = () => {
    let items = filterBySearchText(contactList);
    items = orderBy(items, ['lastActivityDate'], ['desc']);

    const results = items.map((contact) => {
      const {accountNumber} = contact;
      return (
        <Contact
          contact={contact}
          isActiveChat={activeChat === accountNumber}
          key={accountNumber}
          notificationCount={unreadMessages[accountNumber].length}
        />
      );
    });

    return <S.Contacts>{results}</S.Contacts>;
  };

  const renderContactsContainer = () => {
    if (!contactList.length) return <S.EmptyState />;
    return renderContacts();
  };

  const renderSearchContainer = () => {
    return (
      <S.SearchContainer>
        <S.SearchInput onChange={handleSearchInputChange} placeholder="Search contacts" value={searchText} />
      </S.SearchContainer>
    );
  };

  return (
    <>
      <S.Container className={className}>
        {renderSearchContainer()}
        {renderContactsContainer()}
        {renderButtonContainer()}
      </S.Container>
      {renderAddContactModal()}
    </>
  );
};

export default Left;
