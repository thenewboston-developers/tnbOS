import styled from 'styled-components';

import UButton from 'apps/University/components/Button';

export const Button = styled(UButton)`
  width: 100%;
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: 1fr 1fr;
  padding: 32px 24px;
`;

export const Left = styled.div``;

export const PublicationStatus = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
`;

export const Right = styled.div``;
