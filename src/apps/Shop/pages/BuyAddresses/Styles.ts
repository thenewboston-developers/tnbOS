import styled from 'styled-components';

import USectionHeading from 'apps/Shop/components/SectionHeading';

export const Addresses = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;

export const Container = styled.div`
  padding: 24px 32px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 12px;
`;
