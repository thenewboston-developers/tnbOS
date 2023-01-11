import styled from 'styled-components';

export const Container = styled.div`
  background-color: #ddd;
  display: flex;
  justify-content: flex-end;
  padding: 12px 4px 0 0;
`;

export const Tab = styled.div<{isActive?: boolean}>`
  background-color: ${({isActive}) => (isActive ? 'white' : '#eee')};
  border: 1px solid #ccc;
  border-bottom-color: ${({isActive}) => (isActive ? 'white' : '#ddd')};
  margin-right: 4px;
  padding: 6px 12px;

  &:hover {
    background-color: ${({isActive}) => (isActive ? 'white' : '#f6f6f6')};
    cursor: pointer;
  }
`;
