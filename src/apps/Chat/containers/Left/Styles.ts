import styled from 'styled-components';

import UButton from 'apps/Chat/components/Button';

export const Button = styled(UButton)`
  flex: 1;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 12px 16px;
`;

export const Contacts = styled.div`
  flex: auto;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #1f2225;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const Container = styled.div`
  background: #2e3136;
  color: #96989d;
  display: flex;
  flex-direction: column;
`;

export const EmptyState = styled.div`
  flex: auto;
`;

export const SearchContainer = styled.div`
  padding: 12px 16px;
`;

export const SearchInput = styled.input`
  background: #1f2225;
  border-radius: 4px;
  border: 1px solid transparent;
  color: #dcddde;
  font-family: OpenSans, sans-serif;
  height: 30px;
  outline: 0;
  padding: 10px 14px;
  width: 100%;
`;
