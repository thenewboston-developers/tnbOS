import styled from 'styled-components';

import UTickerTable from 'apps/Trade/components/TickerTable';
import {colors} from 'apps/Trade/styles';

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
  color: ${colors.palette.slateGray['300']};
  display: flex;
  flex: auto;
  font-size: 13px;
  justify-content: center;
`;
