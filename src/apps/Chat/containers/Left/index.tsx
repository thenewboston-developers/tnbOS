import {ChangeEvent, useState} from 'react';
import {mdiChatPlus} from '@mdi/js';

import {SFC} from 'system/types';
import Contact from './Contact';
import * as S from './Styles';

const Left: SFC = ({className}) => {
  const [searchText, setSearchText] = useState<string>('');

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const renderContacts = () => {
    return (
      <S.Contacts>
        <Contact isActiveChat={true} />
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
        <S.ButtonContainer>
          <S.Button iconLeft={mdiChatPlus} onClick={() => {}} text="New Chat" />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

export default Left;
