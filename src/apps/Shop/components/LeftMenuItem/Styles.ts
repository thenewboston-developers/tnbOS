import styled from 'styled-components';
import MdiIcon from '@mdi/react';

import {colors} from 'apps/Shop/styles';

export const Icon = styled(MdiIcon)`
  color: ${colors.fonts.default};
`;

export const Text = styled.div<{$isActivePage: boolean}>`
  color: ${colors.fonts.default};
  font-size: 13px;
  font-weight: ${({$isActivePage}) => ($isActivePage ? 700 : 400)};
  margin-left: 12px;
`;

export const Container = styled.div<{$isActivePage: boolean}>`
  align-items: center;
  background: ${({$isActivePage}) => ($isActivePage ? 'rgba(208, 215, 222, 0.32)' : 'transparent')};
  border-radius: 6px;
  display: flex;
  margin: 0 12px 4px;
  padding: 10px;
  width: 226px;

  &:hover {
    background: rgba(208, 215, 222, 0.32);
    cursor: pointer;
  }
`;
