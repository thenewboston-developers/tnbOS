import styled from 'styled-components';

import UAccountLabel from 'apps/Shop/components/AccountLabel';
import UAddressCard from 'apps/Shop/components/AddressCard';
import UEmptyText from 'apps/Shop/components/EmptyText';
import ULine from 'apps/Shop/components/Line';

export const AccountLabel = styled(UAccountLabel)`
  margin-top: 16px;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const AddressCard = styled(UAddressCard)`
  width: fit-content;
`;

export const CartProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr 5fr 1fr;
`;

export const Container = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: auto 30%;
  height: 100%;
  padding: 24px 32px;
  width: 100%;
`;

export const EmptyText = styled(UEmptyText)`
  padding-top: 0;
`;

export const Heading = styled.div`
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 4px;
`;

export const Left = styled.div`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const LeftTop = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
`;

export const Line = styled(ULine)`
  margin-bottom: 12px;
`;

export const Participants = styled.div`
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
