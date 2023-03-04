import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

export const Tab = styled.div<{isActive?: boolean}>`
  background: ${({isActive}) => (isActive ? colors.palette.royalBlue['300'] : 'transparent')};
  border-radius: 4px;
  color: ${({isActive}) => (isActive ? 'white' : '#495057')};
  font-size: 13px;
  font-weight: 500;
  padding: 8px 16px;

  &:hover {
    color: ${({isActive}) => (isActive ? 'white' : '#4458b8')};
    cursor: pointer;
  }
`;
