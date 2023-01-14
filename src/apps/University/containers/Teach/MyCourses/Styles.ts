import styled from 'styled-components';

import USectionHeading from 'apps/University/components/SectionHeading';

export const Container = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px 24px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 4px;
`;
