import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding-left: 4px;
`;

export const Item = styled.div<{isActive?: boolean}>`
  color: ${({isActive}) => (isActive ? '#c9040d' : '#666')};
  font-size: 12px;
  font-weight: 700;
  padding: 8px;

  &:hover {
    color: ${({isActive}) => (isActive ? '#c9040d' : '#333')};
    cursor: pointer;
  }
`;
