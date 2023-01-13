import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding-left: 16px;
`;

export const Item = styled.div<{isActive?: boolean}>`
  color: ${({isActive}) => (isActive ? '#c9040d' : '#666')};
  font-size: 12px;
  font-weight: 700;
  padding: 12px 8px 0;

  &:hover {
    color: ${({isActive}) => (isActive ? '#c9040d' : '#333')};
    cursor: pointer;
  }
`;
