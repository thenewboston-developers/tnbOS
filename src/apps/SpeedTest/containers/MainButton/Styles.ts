import styled, {css} from 'styled-components';

import {colors, fonts} from 'apps/SpeedTest/styles';

const disabledMixin = css`
  border: 1px solid ${colors.slateGray};
  color: ${colors.slateGray};

  &:hover {
    background: transparent;
    border: 1px solid ${colors.slateGray};
    color: ${colors.slateGray};
    cursor: not-allowed;
  }
`;

export const Container = styled.div<{enabled: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid ${colors.palette.green['100']};
  color: ${colors.palette.green['100']};
  display: flex;
  font-size: 36px;
  font-weight: ${fonts.weight.light};
  justify-content: center;
  margin-top: 48px;
  min-height: 260px;
  min-width: 260px;
  transition: all 0.2s;

  &:hover {
    background-color: ${colors.palette.green['200']};
    color: ${colors.palette.green['100']};
    cursor: pointer;
  }

  ${({enabled}) => !enabled && disabledMixin}
`;
