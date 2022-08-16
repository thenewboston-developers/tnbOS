import styled from 'styled-components';

import UButton from 'apps/Chat/components/Button';
import {colors, fonts} from 'apps/Chat/styles';

export const Button = styled(UButton)`
  flex: 1;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 12px 16px;
`;

export const Contacts = styled.div`
  flex: auto;
  overflow: auto;
`;

export const Container = styled.div`
  background: ${colors.leftBackground};
  color: ${fonts.color.light};
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
  background: ${colors.dark};
  border-radius: 4px;
  border: 1px solid transparent;
  color: ${fonts.color.default};
  font-family: ${fonts.family.default};
  height: 30px;
  outline: 0;
  padding: 10px 14px;
  width: 100%;
`;
