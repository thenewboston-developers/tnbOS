import {ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Badge, {BadgeStyle} from 'apps/Trade/components/Badge';
import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {TickerTableRow} from 'apps/Trade/components/TickerTable';
import Transaction from 'apps/Trade/components/Transaction';
import TransferDetails from 'apps/Trade/components/TransferDetails';
import {getTransactions} from 'apps/Trade/selectors/state';
import {FillStatus, Order, TransactionPerspective} from 'apps/Trade/types';
import {getOrderTransactions, getTotalAmount, getTotalConfirmed, getTotalUnconfirmed} from 'apps/Trade/utils/orders';
import {isNetworkTicker} from 'apps/Trade/utils/tickers';
import {useSelfAccountNumber} from 'renderer/hooks';
import {SFC} from 'types';
import * as S from './Styles';

type FillStatusBadgeDict = {
  [key in FillStatus]: ReactNode;
};

interface HostFulfillmentProps {
  order: Order;
}

const HostFulfillment: SFC<HostFulfillmentProps> = ({className, order}) => {
  const selfAccountNumber = useSelfAccountNumber();
  const transactions = useSelector(getTransactions);

  const {client, fillStatus, host} = order;

  const orderTransactions = useMemo(() => {
    return getOrderTransactions(order.id, host.outgoingCrypto, transactions);
  }, [host.outgoingCrypto, order.id, transactions]);

  const perspective = useMemo((): TransactionPerspective => {
    const isClient = client.accountNumber === selfAccountNumber;
    return isClient ? TransactionPerspective.receiver : TransactionPerspective.sender;
  }, [client.accountNumber, selfAccountNumber]);

  const remaining = useMemo(() => {
    if (fillStatus === FillStatus.complete) return 0;
    return Math.max(host.outgoingAmount - getTotalAmount(orderTransactions), 0);
  }, [fillStatus, host.outgoingAmount, orderTransactions]);

  const renderFillStatusBadge = useCallback(() => {
    const fillStatusBadges: FillStatusBadgeDict = {
      [FillStatus.complete]: <Badge badgeStyle={BadgeStyle.success} text="Complete" />,
      [FillStatus.none]: <Badge badgeStyle={BadgeStyle.darkLight} text="None" />,
      [FillStatus.partial]: <Badge badgeStyle={BadgeStyle.info} text="Partial" />,
    };
    return fillStatusBadges[fillStatus];
  }, [fillStatus]);

  const tableRows = useMemo(() => {
    return [
      {
        key: 'Client Receiving Address',
        value: client.receivingAddress,
      },
      {
        key: 'Fill Status',
        value: renderFillStatusBadge(),
      },
    ];
  }, [client.receivingAddress, renderFillStatusBadge]);

  const transferDetailsRows = useMemo(() => {
    let confirmationRows: TickerTableRow[] = [];

    if (!isNetworkTicker(host.outgoingCrypto)) {
      confirmationRows = [
        {
          key: 'Confirmed',
          ticker: host.outgoingCrypto,
          value: getTotalConfirmed(orderTransactions),
        },
        {
          key: 'Unconfirmed',
          ticker: host.outgoingCrypto,
          value: getTotalUnconfirmed(orderTransactions),
        },
      ];
    }

    return [
      {
        key: 'Total Amount',
        ticker: host.outgoingCrypto,
        value: host.outgoingAmount,
      },
      ...confirmationRows,
      {
        key: 'Remaining',
        ticker: host.outgoingCrypto,
        value: remaining,
      },
    ];
  }, [host.outgoingAmount, host.outgoingCrypto, orderTransactions, remaining]);

  const sortedTransactions = useMemo(() => {
    return orderBy(orderTransactions, ['createdDate'], ['desc']).map((transaction) => (
      <Transaction
        key={transaction.id}
        perspective={perspective}
        ticker={host.outgoingCrypto}
        transaction={transaction}
      />
    ));
  }, [host.outgoingCrypto, orderTransactions, perspective]);

  return (
    <S.Container className={className}>
      <OrderCardHeader number={4} text="Host Fulfillment" />
      <OrderCardBottomContent>
        <S.Table rows={tableRows} />
        <TransferDetails rows={transferDetailsRows} transactions={sortedTransactions} />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default HostFulfillment;
