import styled from 'styled-components';

import USectionHeading from 'apps/University/components/SectionHeading';
import UButton from 'system/components/Button';

export const Button = styled(UButton)`
  width: auto;
`;

export const Container = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  overflow-y: auto;
  padding: 24px;
`;

export const Courses = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 2fr 4fr 1fr 1fr 1fr;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 12px;
`;
