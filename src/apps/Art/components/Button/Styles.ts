import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors} from 'apps/Art/styles';

const disabledMixin = css`
  background: ${colors.palette.blue['600']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.blue['600']};
  }
`;

export const Button = styled.button`
  background: ${colors.palette.blue['600']};
  border-radius: 8px;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  display: block;
  font-size: 14px;
  height: 40px;
  padding: 2px 16px;
  width: 100%;

  &:hover {
    background: ${colors.palette.blue['500']};
  }

  ${({disabled}) => disabled && disabledMixin}
`;

export const Icon = styled(UIcon)`
  margin-right: 6px;
`;
