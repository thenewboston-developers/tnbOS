import styled from 'styled-components';

import UBack from 'apps/Shop/components/Back';
import UButton from 'apps/Shop/components/Button';

export const ActivationStatus = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
`;

export const Back = styled(UBack)`
  margin-bottom: 32px;
`;

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
`;

export const Left = styled.div``;

export const Right = styled.div``;
