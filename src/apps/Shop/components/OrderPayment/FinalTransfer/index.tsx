import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TickerTableRow} from 'apps/Shop/components/TickerTable';
import Transaction from 'apps/Shop/components/Transaction';
import TransferDetails from 'apps/Shop/components/TransferDetails';
import {getReceivingAccounts, getTransactions} from 'apps/Shop/selectors/state';
import {Order, Transaction as TTransaction} from 'apps/Shop/types';
import {getReceivingAccountOutgoingTransactions} from 'apps/Shop/utils/receivingAccounts';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface FinalTransferProps {
  order: Order;
}

const FinalTransfer: SFC<FinalTransferProps> = ({className, order}) => {
  const receivingAccounts = useSelector(getReceivingAccounts);
  const transactions = useSelector(getTransactions);

  const receivingAccountTransactions: TTransaction[] = useMemo(() => {
    const networkReceivingAccounts = receivingAccounts[order.networkId];
    if (!networkReceivingAccounts) return [];

    const receivingAccount = networkReceivingAccounts[order.orderId];
    if (!receivingAccount) return [];

    return getReceivingAccountOutgoingTransactions(receivingAccount, transactions);
  }, [order.networkId, order.orderId, receivingAccounts, transactions]);

  const transferDetailsRows = useMemo((): TickerTableRow[] => {
    const total = receivingAccountTransactions.reduce((acc: number, transaction) => acc + transaction.amount, 0);
    return [
      {
        key: 'Total Transferred',
        value: total,
      },
    ];
  }, [receivingAccountTransactions]);

  const sortedTransactions = useMemo(() => {
    return orderBy(receivingAccountTransactions, ['createdDate'], ['desc']).map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }, [receivingAccountTransactions]);

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={3} text="Final Transfer" />
      <OrderPaymentContent>
        <TransferDetails networkId={order.networkId} rows={transferDetailsRows} transactions={sortedTransactions} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default FinalTransfer;
