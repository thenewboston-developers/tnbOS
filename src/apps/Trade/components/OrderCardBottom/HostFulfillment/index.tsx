import {ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import Badge, {BadgeStyle} from 'apps/Trade/components/Badge';
import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import Transaction from 'apps/Trade/components/Transaction';
import TransferDetails from 'apps/Trade/components/TransferDetails';
import {getTransactions} from 'apps/Trade/selectors/state';
import {FillStatus, Order, Transaction as TTransaction} from 'apps/Trade/types';
import {getTotalAmount} from 'apps/Trade/utils/orders';
import {SFC} from 'system/types';
import * as S from './Styles';

type FillStatusBadgeDict = {
  [key in FillStatus]: ReactNode;
};

interface HostFulfillmentProps {
  order: Order;
}

const HostFulfillment: SFC<HostFulfillmentProps> = ({className, order}) => {
  const transactions = useSelector(getTransactions);

  const {client, fillStatus, host, orderId} = order;

  const fulfillmentTransactions = useMemo((): TTransaction[] => {
    const orderTransactions = transactions[orderId];
    if (!orderTransactions) return [];

    const hostTransactions = orderTransactions[host.outgoingAsset];
    if (!hostTransactions || isEmpty(hostTransactions)) return [];

    return Object.values(hostTransactions).filter(({recipient}) => recipient === client.receivingAddress);
  }, [client.receivingAddress, host.outgoingAsset, orderId, transactions]);

  const remaining = useMemo(() => {
    if (fillStatus === FillStatus.complete) return 0;
    return Math.max(host.outgoingAmount - getTotalAmount(fulfillmentTransactions), 0);
  }, [fillStatus, host.outgoingAmount, fulfillmentTransactions]);

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
    return [
      {
        key: 'Total Amount',
        ticker: host.outgoingAsset,
        value: host.outgoingAmount,
      },
      {
        key: 'Remaining',
        ticker: host.outgoingAsset,
        value: remaining,
      },
    ];
  }, [host.outgoingAmount, host.outgoingAsset, remaining]);

  const sortedTransactions = useMemo(() => {
    return orderBy(fulfillmentTransactions, ['date'], ['desc']).map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }, [fulfillmentTransactions]);

  return (
    <S.Container className={className}>
      <OrderCardHeader number={4} text="Host Fulfillment" />
      <OrderCardBottomContent>
        <S.Table rows={tableRows} />
        <TransferDetails networkId={host.outgoingAsset} rows={transferDetailsRows} transactions={sortedTransactions} />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default HostFulfillment;
