import styled from 'styled-components';
import UIcon from '@mdi/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding-left: 10px;
`;

export const Icon = styled(UIcon)``;

export const Item = styled.div<{isActive?: boolean}>`
  color: ${({isActive}) => (isActive ? '#006699' : '#777')};
  font-size: 12px;
  font-weight: 500;
  padding: 2px;

  &:hover {
    cursor: ${({isActive}) => (isActive ? 'pointer' : 'default')};
    text-decoration: ${({isActive}) => (isActive ? 'underline' : 'none')};
  }
`;
