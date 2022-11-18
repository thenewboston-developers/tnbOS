import styled, {css} from 'styled-components';

import {fonts} from 'apps/SpeedTest/styles';
import {RunStatus} from 'apps/SpeedTest/types';

const errorMixin = css`
  background-color: hsla(0, 86%, 69%, 0.18);
  color: #f46a6a;
`;

const pendingMixin = css`
  background-color: rgba(80, 165, 241, 0.18);
  color: #50a5f1;
`;

const successMixin = css`
  background-color: rgba(52, 195, 143, 0.18);
  color: #34c38f;
`;

const timeoutMixin = css`
  background-color: rgba(241, 180, 76, 0.18);
  color: #f1b44c;
`;

export const Container = styled.div<{status: RunStatus}>`
  border-radius: 4px;
  font-size: 10px;
  font-weight: ${fonts.weight.medium};
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({status}) => {
    if (status === RunStatus.error) return errorMixin;
    if (status === RunStatus.pending) return pendingMixin;
    if (status === RunStatus.success) return successMixin;
    if (status === RunStatus.timeout) return timeoutMixin;
    return;
  }}
`;
