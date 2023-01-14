import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 4px 16px;

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled(MdiIcon)<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#cfdbe6' : '#8a9299')};
  margin-right: 12px;
`;

export const Text = styled.div<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? '#cfdbe6' : '#8a9299')};
  font-size: 13px;
  font-weight: 600;
`;
