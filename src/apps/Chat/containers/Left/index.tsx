import {ChangeEvent, useState} from 'react';
import {mdiChatPlus} from '@mdi/js';

import AddContactModal from 'apps/Chat/modals/AddContactModal';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';
import Contact from './Contact';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const [addContactModalIsOpen, toggleAddContactModal] = useToggle(false);
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const renderButtonContainer = () => {
    return (
      <S.ButtonContainer>
        <S.Button icon={mdiChatPlus} onClick={toggleAddContactModal} text="New Chat" />
      </S.ButtonContainer>
    );
  };

  const renderContacts = () => {
    return (
      <S.Contacts>
        <Contact isActiveChat={true} />
        <Contact isActiveChat={false} />
        <Contact isActiveChat={false} />
        <Contact isActiveChat={false} />
        <Contact isActiveChat={false} />
      </S.Contacts>
    );
  };

  const renderContactsContainer = () => {
    // return <S.EmptyState />;
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
      {addContactModalIsOpen ? <AddContactModal close={toggleAddContactModal} /> : null}
    </>
  );
};

export default Left;
