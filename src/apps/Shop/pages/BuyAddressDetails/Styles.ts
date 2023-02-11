import styled from 'styled-components';

import UBack from 'apps/Shop/components/Back';
import UButton from 'apps/Shop/components/Button';
import USectionHeading from 'apps/Shop/components/SectionHeading';

export const Back = styled(UBack)`
  margin-bottom: 32px;
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  padding: 24px;
`;

export const SectionHeading = styled(USectionHeading)`
  margin-bottom: 24px;
`;
