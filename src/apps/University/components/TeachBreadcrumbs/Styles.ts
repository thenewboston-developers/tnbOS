import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  margin: 16px 0 0;
  padding: 0 24px;
`;

export const Item = styled.div<{isActive: boolean}>`
  color: ${({isActive}) => (isActive ? '#006699' : '#777')};
  font-size: 12px;
  font-weight: 500;
  padding: 2px;

  &:first-child {
    padding-left: 0;
  }

  &:hover {
    cursor: ${({isActive}) => (isActive ? 'pointer' : 'default')};
    text-decoration: ${({isActive}) => (isActive ? 'underline' : 'none')};
  }
`;
