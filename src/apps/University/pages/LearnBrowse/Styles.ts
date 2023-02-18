import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #ebebeb;
  display: block;
  height: 38px;
  outline: 0;
  padding: 0 12px;
  transition: all 0.15s ease-in-out;
  width: 100%;

  &:focus {
    border: 1px solid ${colors.palette.blue['200']};
  }

  &:hover:not(:focus) {
    border: 1px solid #cbd0d9;
  }

  &::placeholder {
    font-style: italic;
    opacity: 0.8;
  }
`;

export const PageContent = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const Search = styled.div`
  background: #ededed;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
`;
