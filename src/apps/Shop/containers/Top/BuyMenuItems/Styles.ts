import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Icon = styled(MdiIcon)``;

export const IconContainer = styled.div`
  position: relative;

  &:hover {
    cursor: pointer;
  }
`;

export const ProductCount = styled.div`
  align-items: center;
  background: red;
  border-radius: 8px;
  color: #fff;
  display: flex;
  font-size: 10px;
  font-weight: 500;
  height: 14px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 14px;
`;
