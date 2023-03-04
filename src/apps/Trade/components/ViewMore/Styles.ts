import styled from 'styled-components';

import {colors} from 'apps/Trade/styles';

export const Container = styled.div`
  color: ${colors.palette.royalBlue['300']};
  display: flex;
  font-size: 13px;
  justify-content: center;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
