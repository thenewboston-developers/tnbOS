import styled from 'styled-components';

import Card from 'apps/Trade/components/Card';
import UTickerTable from 'apps/Trade/components/TickerTable';
import UTransactions from 'apps/Trade/pages/Wallets/WalletHome/Transactions';

export const Balance = styled(Card)`
  display: flex;
  justify-content: space-between;
`;

export const BalanceLeft = styled.div``;

export const BalanceRight = styled.div``;

export const BalanceValue = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const Container = styled.div``;

export const TickerTable = styled(UTickerTable)`
  width: fit-content;
`;

export const Transactions = styled(UTransactions)`
  margin-top: 24px;
`;
