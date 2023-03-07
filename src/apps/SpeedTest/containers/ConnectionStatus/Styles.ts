import styled, {css} from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors} from 'apps/SpeedTest/styles';
import {ConnectionStatus} from 'apps/SpeedTest/types';

const connectedMixin = css`
  color: ${colors.palette.green['100']};
`;

const disconnectedMixin = css`
  color: ${colors.palette.red['100']};
`;

const invalidMixin = css`
  color: ${colors.slateGray};
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
  color: ${colors.fonts.secondary};
  font-size: 13px;
`;
