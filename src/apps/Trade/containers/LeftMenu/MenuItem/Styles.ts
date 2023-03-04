import styled from 'styled-components';
import MdiIcon from '@mdi/react';

import {colors} from 'system/styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 24px;

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled(MdiIcon)<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#6a7187')};
  margin-right: 12px;
`;

export const Left = styled.div`
  display: flex;
  flex: auto;
`;

export const NotificationCount = styled.div`
  align-items: center;
  background: ${colors.red};
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-size: 11px;
  height: 16px;
  justify-content: center;
  width: 24px;
`;

export const NotificationCountContainer = styled.div`
  align-items: center;
  display: flex;
  margin-left: 10px;
`;

export const Text = styled.div<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#fff' : '#a6b0cf')};
  font-size: 13px;
`;
