import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors, fonts} from 'apps/Chat/styles';
import {ButtonColor} from './types';

const dangerMixin = css`
  background-color: #f46a6a;

  &:hover {
    background: #cf5a5a;
  }
`;

const disabledMixin = css`
  background: ${colors.palette.blue['600']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.blue['500']};
  }
`;

const hasIconMixin = css`
  align-items: center;
  display: flex;
  width: auto;
`;

const successMixin = css`
  background: ${colors.palette.green['500']};

  &:hover {
    background: ${colors.palette.green['400']};
  }
`;

export const Button = styled.button<{$color: ButtonColor; hasIcon: boolean}>`
  background: ${colors.palette.blue['500']};
  border-radius: 4px;
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  display: block;
  font-family: ${fonts.family.default};
  height: 34px;
  padding: 2px 16px;

  &:hover {
    background: ${colors.palette.blue['400']};
  }

  ${({$color}) => {
    if ($color === ButtonColor.danger) return dangerMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}

  ${({disabled}) => disabled && disabledMixin}

  ${({hasIcon}) => hasIcon && hasIconMixin}
`;

export const Icon = styled(UIcon)`
  margin-right: 6px;
`;
