import styled from 'styled-components';
import MdiIcon from '@mdi/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  padding: 10px 24px;

  &:hover {
    cursor: pointer;
  }
`;

export const Icon = styled(MdiIcon)<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? 'white' : '#6a7187')};
  margin-right: 12px;
`;

export const Text = styled.div<{$isActivePage: boolean}>`
  color: ${({$isActivePage}) => ($isActivePage ? 'white' : '#a6b0cf')};
  font-size: 13px;
`;
