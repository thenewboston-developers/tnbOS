import styled from 'styled-components';

import UHistoryTable from 'apps/Art/components/HistoryTable';

export const Container = styled.div`
  overflow-y: auto;
  padding: 24px;
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
