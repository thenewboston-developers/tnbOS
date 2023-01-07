import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {TickerTableRow} from 'apps/Trade/components/TickerTable';
import Transaction from 'apps/Trade/components/Transaction';
import TransferDetails from 'apps/Trade/components/TransferDetails';
import {getReceivingAccounts, getTransactions} from 'apps/Trade/selectors/state';
import {Order, Transaction as TTransaction} from 'apps/Trade/types';
import {getReceivingAccountOutgoingTransactions} from 'apps/Trade/utils/receivingAccounts';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface FinalTransferProps {
  order: Order;
}

const FinalTransfer: SFC<FinalTransferProps> = ({className, order}) => {
  const receivingAccounts = useSelector(getReceivingAccounts);
  const self = useSelector(getSelf);
  const transactions = useSelector(getTransactions);

  const {client, host, orderId} = order;

  const networkId = useMemo(() => {
    const isClient = client.accountNumber === self.accountNumber;
    return isClient ? host.outgoingAsset : client.outgoingAsset;
  }, [client.accountNumber, client.outgoingAsset, host.outgoingAsset, self.accountNumber]);

  const receivingAccountTransactions: TTransaction[] = useMemo(() => {
    const networkReceivingAccounts = receivingAccounts[networkId];
    if (!networkReceivingAccounts) return [];
    const receivingAccount = networkReceivingAccounts[orderId];
    if (!receivingAccount) return [];
    return getReceivingAccountOutgoingTransactions(receivingAccount, networkId, transactions);
  }, [networkId, orderId, receivingAccounts, transactions]);

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
      <OrderCardHeader number={5} text="Final Transfer" />
      <OrderCardBottomContent>
        <TransferDetails networkId={host.outgoingAsset} rows={transferDetailsRows} transactions={sortedTransactions} />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default FinalTransfer;
