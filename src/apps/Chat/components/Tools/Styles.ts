import styled from 'styled-components';

import {colors} from 'apps/Chat/styles';

export const Container = styled.div`
  align-items: center;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  display: flex;
  overflow: hidden;
  position: absolute;
  right: 0;

  &:hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 16%);
  }
`;
