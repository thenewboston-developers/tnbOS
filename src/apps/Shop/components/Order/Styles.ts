import styled from 'styled-components';

import UAddressCard from 'apps/Shop/components/AddressCard';

export const AddressCard = styled(UAddressCard)`
  padding: 8px 12px;
  width: fit-content;
`;

export const Bottom = styled.div`
  background: #fff;
  padding: 12px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #e3e8ee;
  display: flex;
  flex-direction: column;
`;

export const OrderProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 100px auto;
  margin-top: 16px;
`;
