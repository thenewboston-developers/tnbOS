import styled from 'styled-components';

import {colors} from 'apps/Art/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const MenuItem = styled.div`
  color: ${colors.palette.blue['500']};
  display: flex;
  font-size: 13px;
  width: fit-content;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
