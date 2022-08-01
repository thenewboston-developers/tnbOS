import styled, {css} from 'styled-components';

import {colors} from 'system/styles';

const buttonStyle = css`
  cursor: pointer;

  &:hover {
    background: ${colors.palette.gray['100']};
  }
`;

const disabledStyle = css`
  color: ${colors.palette.gray['300']};
  cursor: default;

  &:hover {
    background: transparent;
  }
`;

const sizeStyle = (size = 24, totalSize = 30) => css`
  height: ${Math.max(size, totalSize)}px;
  width: ${Math.max(size, totalSize)}px;
`;

interface WrapperProps {
  disabled: boolean;
  hasOnClickHandler: boolean;
  size?: number;
  totalSize?: number | 'unset';
  unfocusable: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  align-items: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s;

  &:focus {
    background: ${({unfocusable}) => (unfocusable ? null : colors.palette.gray['100'])};
  }

  ${({size, totalSize}) => totalSize !== 'unset' && sizeStyle(size, totalSize)};
  ${({hasOnClickHandler}) => !!hasOnClickHandler && buttonStyle};
  ${({disabled}) => !!disabled && disabledStyle};
`;
