import styled from 'styled-components';

import USectionHeading from 'apps/Shop/components/SectionHeading';

export const Container = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  overflow-y: auto;
`;

export const Products = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1.5fr 6fr 1fr 1fr;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 12px;
`;
