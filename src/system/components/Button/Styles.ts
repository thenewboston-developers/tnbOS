import styled, {css} from 'styled-components';
import UIcon from '@mdi/react';

import {colors} from 'system/styles';

const disabledMixin = css`
  background: ${colors.palette.gray['200']};
  cursor: not-allowed;

  &:hover {
    background: ${colors.palette.gray['200']};
  }
`;

const hasIconMixin = css`
  align-items: center;
  border-radius: 6px;
  display: flex;
  width: auto;
`;

export const Button = styled.button<{hasIcon: boolean}>`
  background: ${colors.palette.blue['700']};
  border-radius: 100px;
  border: none;
  color: ${colors.white};
  cursor: pointer;
  display: block;
  min-height: 36px;
  padding: 8px 12px;
  width: 100%;

  &:hover {
    background: ${colors.palette.blue['600']};
  }

  ${({disabled}) => disabled && disabledMixin}

  ${({hasIcon}) => hasIcon && hasIconMixin}
`;

export const Icon = styled(UIcon)`
  margin-right: 6px;
`;
