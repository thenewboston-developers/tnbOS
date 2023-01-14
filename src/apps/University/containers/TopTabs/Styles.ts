import styled from 'styled-components';

export const Container = styled.div`
  background-color: #2097f3;
  display: flex;
  justify-content: flex-end;
  padding: 12px 12px 0 0;
`;

export const Tab = styled.div<{isActive?: boolean}>`
  background-color: ${({isActive}) => (isActive ? '#f5f6f7' : '#1b77c3')};
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: ${({isActive}) => (isActive ? 'rgba(57,68,77,.84)' : 'hsla(0, 0%, 100%, 0.5)')};
  font-weight: 500;
  margin-right: 8px;
  padding: 6px 12px;

  &:hover {
    background-color: ${({isActive}) => (isActive ? '#f5f6f7' : '#2683d0')};
    cursor: pointer;
  }

  &:last-child {
    margin-right: 0;
  }
`;
