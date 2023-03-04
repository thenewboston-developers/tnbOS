import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors} from 'apps/Trade/styles';
import {ButtonColor} from './types';

const BUTTON_HEIGHT = 36;

const dangerMixin = css`
  background-color: ${colors.palette.red['300']};

  &:hover {
    background: #cf5a5a;
  }
`;

const disabledMixin = css`
  background: ${colors.palette.royalBlue['300']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.royalBlue['300']};
  }
`;

const hasIconMixin = css`
  align-items: center;
  border-radius: 6px;
  display: flex;
  width: auto;
`;

const successMixin = css`
  background-color: #34c38f;

  &:hover {
    background: #2ca67a;
  }
`;

export const Button = styled.button<{$color: ButtonColor; hasIcon: boolean}>`
  background: ${colors.palette.royalBlue['300']};
  border-radius: ${`${BUTTON_HEIGHT / 2}px`};
  border: 1px solid transparent;
  color: white;
  cursor: pointer;
  display: block;
  font-family: Poppins, sans-serif;
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 0 12px;

  &:hover {
    background: #485ec4;
  }

  ${({$color}) => {
    if ($color === ButtonColor.danger) return dangerMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}

  ${({disabled}) => disabled && disabledMixin}

  ${({hasIcon}) => hasIcon && hasIconMixin}
`;

export const IconLeft = styled(UIcon)`
  margin-right: 6px;
`;

export const IconRight = styled(UIcon)`
  margin-left: 6px;
`;
