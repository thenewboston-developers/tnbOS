import styled from 'styled-components';

import UAddressCard from 'apps/Shop/components/AddressCard';

export const AddressCard = styled(UAddressCard)`
  padding: 8px 12px;
  width: fit-content;
`;

export const Bottom = styled.div`
  padding: 12px;
`;

export const Container = styled.div`
  border-radius: 4px;
  border: 1px solid #e3e8ee;
  display: flex;
  flex-direction: column;
`;

export const PriceAmount = styled.div`
  font-weight: 700;
  margin-left: 6px;
`;

export const PriceContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const PriceNetworkImage = styled.img`
  border-radius: 50%;
  height: 12px;
  width: 12px;
`;

export const Top = styled.div`
  background: #eee;
  border-bottom: 1px solid #e3e8ee;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 12px;
`;

export const TopDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopLabel = styled.div`
  color: #999;
  font-size: 11px;
`;

export const TopValue = styled.div`
  color: #555;
  font-size: 13px;
  margin-top: 4px;
`;
