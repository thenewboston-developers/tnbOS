import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Icon = styled(UMdiIcon)`
  border-radius: 50%;
  color: #74788d;
  margin-right: -4px;
  padding: 4px;
  transition: all 0.15s;

  &:hover {
    background: #31394e;
    color: #556ee5;
    cursor: pointer;
  }
`;

export const Left = styled.div``;

export const Right = styled.div``;
