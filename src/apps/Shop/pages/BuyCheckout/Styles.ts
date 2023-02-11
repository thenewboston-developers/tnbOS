import styled from 'styled-components';

import UAddressCard from 'apps/Shop/components/AddressCard';
import ULine from 'apps/Shop/components/Line';

export const AddressCard = styled(UAddressCard)`
  margin-bottom: 32px;
  width: fit-content;
`;

export const CartProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 5fr;
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: auto 30%;
  height: 100%;
  padding: 24px;
  width: 100%;
`;

export const Heading = styled.div`
  color: #111827;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 4px;
`;

export const Left = styled.div`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Line = styled(ULine)`
  margin-bottom: 12px;
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
