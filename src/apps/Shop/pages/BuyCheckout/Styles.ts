import styled from 'styled-components';

import UAddressCard from 'apps/Shop/components/AddressCard';
import UEmptyText from 'apps/Shop/components/EmptyText';
import ULine from 'apps/Shop/components/Line';

export const AddressCard = styled(UAddressCard)`
  width: fit-content;
`;

export const AddressContent = styled.div`
  margin-bottom: 32px;
`;

export const CartProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 5fr 1fr;
`;

export const Container = styled.div`
  display: grid;
  gap: 48px;
  grid-template-columns: auto 30%;
  height: 100%;
  padding: 24px;
  width: 100%;
`;

export const EmptyText = styled(UEmptyText)`
  padding-top: 0;
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
