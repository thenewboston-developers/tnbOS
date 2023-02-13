import styled from 'styled-components';

import UAddressCard from 'apps/Shop/components/AddressCard';
import {colors} from 'apps/Shop/styles';

export const AddressCard = styled(UAddressCard)`
  padding: 8px 12px;
  width: fit-content;
`;

export const Bottom = styled.div`
  background: #fff;
  padding: 16px 24px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid ${colors.border.default};
  box-shadow: 0 3px 6px rgb(140 149 159 / 15%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const OrderProducts = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: 100px auto;
  margin-top: 24px;
`;
