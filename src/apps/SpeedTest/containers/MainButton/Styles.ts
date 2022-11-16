import styled, {css} from 'styled-components';

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
  font-weight: 300;
  justify-content: center;
  margin-top: 48px;
  transition: all 0.2s;
  width: 40%;

  &:hover {
    background: rgba(52, 195, 143, 0.1);
    color: #34c38f;
    cursor: pointer;
  }

  ${({enabled}) => !enabled && disabledMixin}
`;
