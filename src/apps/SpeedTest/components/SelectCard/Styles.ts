import styled, {css} from 'styled-components';

const selectedMixin = css`
  background: rgba(52, 195, 143, 0.1);
  border: 1px solid rgba(52, 195, 143, 0.5);

  &:hover {
    background: rgba(52, 195, 143, 0.1);
    color: #c3cbe4;
  }
`;

export const Container = styled.div<{isSelected: boolean}>`
  background: rgba(166, 176, 207, 0.04);
  border: 1px solid transparent;
  border-radius: 4px;
  color: #c3cbe4;
  margin-bottom: 12px;
  padding: 10px 12px;
  transition: all 0.15s;
  width: 100%;

  &:hover {
    background: rgba(166, 176, 207, 0.1);
    color: #fff;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${({isSelected}) => isSelected && selectedMixin}
`;
