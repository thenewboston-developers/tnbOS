import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors, fonts} from 'apps/Chat/styles';

export const IMG_HEIGHT = 26;

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: ${`${IMG_HEIGHT}px`};
  justify-content: center;
  margin-left: 2px;
  width: auto;
`;

export const Icon = styled(UMdiIcon)`
  color: ${colors.iconGray};

  &:hover {
    color: ${fonts.color.default};
    cursor: pointer;
  }
`;
