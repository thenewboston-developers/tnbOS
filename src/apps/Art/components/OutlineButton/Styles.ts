import styled, {css} from 'styled-components';

import {colors} from 'apps/Art/styles';
import {ButtonColor} from './types';

const dangerMixin = css`
  border: 1px solid ${colors.palette.red['500']};
  color: ${colors.palette.red['500']};

  &:hover {
    background: ${colors.palette.red['500']};
  }
`;

const successMixin = css`
  border: 1px solid ${colors.palette.green['500']};
  color: ${colors.palette.green['500']};

  &:hover {
    background: ${colors.palette.green['500']};
  }
`;

export const Button = styled.button<{$color?: ButtonColor}>`
  background: transparent;
  border-radius: 8px;
  border: 1px solid ${colors.palette.blue['500']};
  color: ${colors.palette.blue['500']};
  cursor: pointer;
  font-size: 13px;
  height: 32px;
  padding: 2px 12px;
  transition: all 0.15s;

  &:hover {
    background: ${colors.palette.blue['500']};
    color: white;
  }

  ${({$color}) => {
    if ($color === ButtonColor.danger) return dangerMixin;
    if ($color === ButtonColor.success) return successMixin;
    return;
  }}
`;
