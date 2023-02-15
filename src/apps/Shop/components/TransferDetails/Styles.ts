import styled from 'styled-components';

import UTickerTable from 'apps/Shop/components/TickerTable';

export const Container = styled.div`
  display: flex;
`;

export const TickerTable = styled(UTickerTable)`
  margin-right: 20px;
  width: fit-content;
`;

export const Transactions = styled.div`
  flex: auto;
`;

export const TransactionsEmptyState = styled.div`
  align-items: center;
  color: #74788d;
  display: flex;
  flex: auto;
  font-size: 13px;
  justify-content: center;
`;
