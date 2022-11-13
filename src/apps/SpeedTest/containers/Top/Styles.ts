import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

export const Button = styled.button`
  background: transparent;
  border: 1px solid #74788d;
  border-radius: 4px;
  color: #c3cbe4;
  padding: 8px 12px;
  transition: all 0.15s;
  width: 100%;

  &:hover {
    background: rgba(166, 176, 207, 0.2);
    color: #fff;
    cursor: pointer;
  }
`;

export const Container = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  width: 100%;
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
