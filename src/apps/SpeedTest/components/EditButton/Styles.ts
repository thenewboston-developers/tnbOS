import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors} from 'apps/SpeedTest/styles';

export const Container = styled.div``;

export const Icon = styled(UMdiIcon)`
  border-radius: 50%;
  color: ${colors.slateGray};
  margin-right: -4px;
  padding: 4px;
  transition: all 0.15s;

  &:hover {
    background: ${colors.icon.hoverBackground};
    color: ${colors.icon.hoverColor};
    cursor: pointer;
  }
`;
