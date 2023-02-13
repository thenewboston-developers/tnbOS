import styled from 'styled-components';

import USectionHeading from 'apps/Shop/components/SectionHeading';

export const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 24px 32px;
`;

export const Orders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 24px;
`;
