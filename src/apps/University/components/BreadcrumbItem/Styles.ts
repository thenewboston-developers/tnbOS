import styled from 'styled-components';

import {colors} from 'apps/University/styles';

export const Container = styled.div<{isActive: boolean}>`
  color: ${({isActive}) => (isActive ? colors.palette.blue['200'] : colors.fonts.secondary)};
  font-size: 12px;
  font-weight: 400;
  padding: 2px;

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    cursor: ${({isActive}) => (isActive ? 'pointer' : 'default')};
    text-decoration: ${({isActive}) => (isActive ? 'underline' : 'none')};
  }
`;
