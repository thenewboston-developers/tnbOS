import styled, {css} from 'styled-components';

import {fonts} from 'apps/SpeedTest/styles';

const disabledMixin = css`
  border: 1px solid #74788d;
  color: #74788d;

  &:hover {
    background: transparent;
    border: 1px solid #74788d;
    color: #74788d;
    cursor: not-allowed;
  }
`;

export const Container = styled.div<{enabled: boolean}>`
  align-items: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid #34c38f;
  color: #34c38f;
  display: flex;
  font-size: 36px;
  font-weight: ${fonts.weight.light};
  justify-content: center;
  margin-top: 48px;
  min-height: 260px;
  min-width: 260px;
  transition: all 0.2s;

  &:hover {
    background: rgba(52, 195, 143, 0.1);
    color: #34c38f;
    cursor: pointer;
  }

  ${({enabled}) => !enabled && disabledMixin}
`;
