import styled from 'styled-components';

import UButton from 'apps/University/components/Button';
import USectionHeading from 'apps/University/components/SectionHeading';

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
  padding: 24px;
`;

export const Left = styled.div``;

export const Right = styled.div``;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 16px;
`;
