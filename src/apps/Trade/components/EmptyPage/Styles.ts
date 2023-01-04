import styled from 'styled-components';

import UEmptyState from 'apps/Trade/components/EmptyState';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EmptyState = styled(UEmptyState)`
  flex: auto;
  justify-content: center;
`;
