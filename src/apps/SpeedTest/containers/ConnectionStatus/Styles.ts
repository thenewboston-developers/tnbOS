import styled, {css} from 'styled-components';
import UMdiIcon from '@mdi/react';

import {ConnectionStatus} from 'apps/SpeedTest/types';

const connectedMixin = css`
  color: #34c38f;
`;

const disconnectedMixin = css`
  color: #f46a6a;
`;

const invalidMixin = css`
  color: #74788d;
`;

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin-top: 24px;
`;

export const Icon = styled(UMdiIcon)<{status: ConnectionStatus}>`
  margin-right: 8px;

  ${({status}) => {
    if (status === ConnectionStatus.connected) return connectedMixin;
    if (status === ConnectionStatus.disconnected) return disconnectedMixin;
    if (status === ConnectionStatus.invalid) return invalidMixin;
    return;
  }}
`;

export const Text = styled.div`
  color: #c3cbe4;
  font-size: 13px;
`;
