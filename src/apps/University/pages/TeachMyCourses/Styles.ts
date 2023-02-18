import styled from 'styled-components';

import USectionHeading from 'apps/University/components/SectionHeading';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
`;

export const Courses = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr 6fr 1fr 1fr;
`;

export const PageContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 24px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 12px;
`;
