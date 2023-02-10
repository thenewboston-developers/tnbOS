import styled, {css} from 'styled-components';

import {colors} from 'apps/Shop/styles';
import {ActivationStatus} from 'apps/Shop/types';

const activeMixin = css`
  background-color: ${colors.palette.green['200']};
`;

const draftMixin = css`
  background-color: ${colors.palette.black['100']};
`;

export const Container = styled.div<{activationStatus: ActivationStatus}>`
  border-radius: 4px;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  padding: 2px 4px;
  white-space: nowrap;
  width: fit-content;

  ${({activationStatus}) => {
    if (activationStatus === ActivationStatus.active) return activeMixin;
    if (activationStatus === ActivationStatus.draft) return draftMixin;
    return;
  }}
`;
