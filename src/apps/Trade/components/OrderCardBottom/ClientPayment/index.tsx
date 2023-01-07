import {ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import Badge, {BadgeStyle} from 'apps/Trade/components/Badge';
import CountdownTimer from 'apps/Trade/components/CountdownTimer';
import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {TableRow} from 'apps/Trade/components/Table';
import {TickerTableRow} from 'apps/Trade/components/TickerTable';
import Transaction from 'apps/Trade/components/Transaction';
import TransferDetails from 'apps/Trade/components/TransferDetails';
import {getTransactions} from 'apps/Trade/selectors/state';
import {ApprovalStatus, Order, PaymentStatus, Transaction as TTransaction} from 'apps/Trade/types';
import {getTotalAmount} from 'apps/Trade/utils/orders';
import {SFC} from 'system/types';
import {longDate} from 'system/utils/dates';
import * as S from './Styles';

interface ClientPaymentProps {
  order: Order;
}

type PaymentStatusBadgeDict = {
  [key in PaymentStatus]: ReactNode;
};

const ClientPayment: SFC<ClientPaymentProps> = ({className, order}) => {
  const transactions = useSelector(getTransactions);

  const {approvalStatus, client, createdDate, host, orderId, paymentExpirationDate, paymentStatus} = order;

  const paymentTransactions = useMemo((): TTransaction[] => {
    const orderTransactions = transactions[orderId];
    if (!orderTransactions) return [];

    const clientTransactions = orderTransactions[client.outgoingAsset];
    if (!clientTransactions || isEmpty(clientTransactions)) return [];

    return Object.values(clientTransactions).filter(({recipient}) => recipient === host.receivingAddress);
  }, [client.outgoingAsset, host.receivingAddress, orderId, transactions]);

  const remaining = useMemo(() => {
    if (paymentStatus === PaymentStatus.complete) return 0;
    return Math.max(client.outgoingAmount - getTotalAmount(paymentTransactions), 0);
  }, [client.outgoingAmount, paymentTransactions, paymentStatus]);

  const renderPaymentStatusBadge = useCallback(() => {
    const paymentStatusBadges: PaymentStatusBadgeDict = {
      [PaymentStatus.complete]: <Badge badgeStyle={BadgeStyle.success} text="Complete" />,
      [PaymentStatus.error]: <Badge badgeStyle={BadgeStyle.danger} text="Error" />,
      [PaymentStatus.expired]: <Badge badgeStyle={BadgeStyle.dark} text="Expired" />,
      [PaymentStatus.none]: <Badge badgeStyle={BadgeStyle.darkLight} text="None" />,
      [PaymentStatus.partial]: <Badge badgeStyle={BadgeStyle.info} text="Partial" />,
    };
    return paymentStatusBadges[paymentStatus];
  }, [paymentStatus]);

  const tableRows = useMemo(() => {
    let paymentTimeRemainingRow: TableRow[] = [];

    if (
      approvalStatus === ApprovalStatus.approved &&
      [PaymentStatus.none, PaymentStatus.partial].includes(paymentStatus)
    ) {
      paymentTimeRemainingRow = [
        {
          key: 'Payment Time Remaining',
          value: <CountdownTimer endDate={paymentExpirationDate} startDate={createdDate} />,
        },
      ];
    }

    return [
      {
        key: 'Host Receiving Address',
        value: host.receivingAddress || '-',
      },
      {
        key: 'Payment Expiration Date',
        value: longDate(paymentExpirationDate),
      },
      ...paymentTimeRemainingRow,
      {
        key: 'Payment Status',
        value: renderPaymentStatusBadge(),
      },
    ];
  }, [
    approvalStatus,
    createdDate,
    host.receivingAddress,
    paymentExpirationDate,
    paymentStatus,
    renderPaymentStatusBadge,
  ]);

  const transferDetailsRows = useMemo((): TickerTableRow[] => {
    return [
      {
        key: 'Total Due',
        value: client.outgoingAmount,
      },
      {
        key: 'Remaining',
        value: remaining,
      },
    ];
  }, [client.outgoingAmount, remaining]);

  const sortedTransactions = useMemo(() => {
    return orderBy(paymentTransactions, ['date'], ['desc']).map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }, [paymentTransactions]);

  return (
    <S.Container className={className}>
      <OrderCardHeader number={3} text="Client Payment" />
      <OrderCardBottomContent>
        <S.Table rows={tableRows} />
        <TransferDetails
          networkId={client.outgoingAsset}
          rows={transferDetailsRows}
          transactions={sortedTransactions}
        />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default ClientPayment;
