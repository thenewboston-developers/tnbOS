import styled, {css} from 'styled-components';

import {colors, fonts} from 'apps/SpeedTest/styles';
import {RunStatus} from 'apps/SpeedTest/types';

const errorMixin = css`
  background-color: ${colors.palette.red['200']};
  color: ${colors.palette.red['100']};
`;

const pendingMixin = css`
  background-color: ${colors.palette.blue['200']};
  color: ${colors.palette.blue['100']};
`;

const successMixin = css`
  background-color: ${colors.palette.green['200']};
  color: ${colors.palette.green['100']};
`;

const timeoutMixin = css`
  background-color: ${colors.palette.yellow['200']};
  color: ${colors.palette.yellow['100']};
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
