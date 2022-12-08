import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

export const Container = styled.div`
  align-items: center;
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 2fr 1fr 1fr;
`;

export const Icon = styled(UMdiIcon)`
  color: green;
`;
