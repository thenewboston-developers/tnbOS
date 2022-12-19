import styled, {css} from 'styled-components';

const selectedMixin = css`
  background: rgba(52, 195, 143, 0.1);
  border: 1px solid rgba(52, 195, 143, 0.5);

  &:hover {
    background: rgba(52, 195, 143, 0.1);
  }
`;

export const Container = styled.div<{isSelected: boolean}>`
  background: #fbfbfb;
  border: 1px solid #eff2f7;
  border-radius: 4px;
  margin-bottom: 12px;
  padding: 10px 12px;
  transition: all 0.15s;
  width: 100%;

  &:hover {
    background: #f6f6f6;
    cursor: pointer;
  }

  &:last-child {
    margin-bottom: 0;
  }

  ${({isSelected}) => isSelected && selectedMixin}
`;
