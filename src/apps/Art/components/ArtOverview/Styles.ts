import styled from 'styled-components';

import UHistoryTable from 'apps/Art/components/HistoryTable';

export const Accounts = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 24px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Description = styled.div`
  color: #777;
  margin-top: 16px;
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 42px;
`;

export const DetailItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const H2 = styled.h2`
  font-size: 16px;
  font-weight: 700;
`;

export const History = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 42px;
`;

export const HistoryTable = styled(UHistoryTable)`
  margin-top: 16px;
`;

export const Img = styled.img`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Left = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  color: #222;
  font-size: 32px;
  font-weight: 700;
  margin-top: 4px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Top = styled.div`
  display: flex;
  gap: 24px;
`;
