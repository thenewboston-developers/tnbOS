import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors} from 'apps/Shop/styles';
import {ButtonColor} from './types';

const BUTTON_HEIGHT = 36;

const blueMixin = css`
  background-color: ${colors.palette.blue['200']};

  &:hover {
    background: ${colors.palette.blue['300']};
  }
`;

const grayMixin = css`
  background-color: ${colors.palette.gray['200']};
  color: ${colors.fonts.default};

  &:hover {
    background: ${colors.palette.gray['300']};
  }
`;

const redMixin = css`
  background-color: ${colors.palette.red['200']};

  &:hover {
    background: ${colors.palette.red['300']};
  }
`;

const disabledMixin = css`
  background: ${colors.palette.black['100']};
  cursor: not-allowed;
  opacity: 0.65;

  &:hover {
    background: ${colors.palette.black['100']};
  }
`;

const hasIconMixin = css`
  align-items: center;
  display: flex;
  padding-right: 16px;
  width: auto;
`;

export const Button = styled.button<{$color?: ButtonColor; hasIcon: boolean}>`
  background: ${colors.palette.purple['300']};
  border-radius: ${`${BUTTON_HEIGHT / 2}px`};
  border: 1px solid transparent;
  color: #fff;
  cursor: pointer;
  display: block;
  font-size: 14px;
  height: ${`${BUTTON_HEIGHT}px`};
  padding: 0 12px;
  transition: all 0.15s;

  &:hover {
    background: ${colors.palette.purple['400']};
  }

  ${({$color}) => {
    if ($color === ButtonColor.blue) return blueMixin;
    if ($color === ButtonColor.gray) return grayMixin;
    if ($color === ButtonColor.red) return redMixin;
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
