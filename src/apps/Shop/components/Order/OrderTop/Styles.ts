import styled from 'styled-components';

export const Container = styled.div`
  background: #eee;
  border-bottom: 1px solid #e3e8ee;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 12px;
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DetailLabel = styled.div`
  color: #999;
  font-size: 11px;
`;

export const DetailValue = styled.div`
  color: #555;
  font-size: 13px;
  margin-top: 4px;
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
