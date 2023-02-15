import {ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import CountdownTimer from 'apps/Shop/components/CountdownTimer';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {TickerTableRow} from 'apps/Shop/components/TickerTable';
import Transaction from 'apps/Shop/components/Transaction';
import {getTransactions} from 'apps/Shop/selectors/state';
import {ApprovalStatus, Order, PaymentStatus, Transaction as TTransaction} from 'apps/Shop/types';
import {getTotalAmount} from 'apps/Shop/utils/orders';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import {longDate} from 'system/utils/dates';
import * as S from './Styles';

type PaymentStatusBadgeDict = {
  [key in PaymentStatus]: ReactNode;
};

export interface BuyerPaymentProps {
  order: Order;
}

const BuyerPayment: SFC<BuyerPaymentProps> = ({className, order}) => {
  const self = useSelector(getSelf);
  const transactions = useSelector(getTransactions);

  const {
    approvalStatus,
    buyer,
    createdDate,
    networkId,
    orderId,
    paymentExpirationDate,
    paymentStatus,
    receivingAddress,
    seller,
    total,
  } = order;

  const paymentTransactions = useMemo((): TTransaction[] => {
    const orderTransactions = transactions[orderId];
    if (!orderTransactions) return [];

    const networkTransactions = orderTransactions[networkId];
    if (!networkTransactions || isEmpty(networkTransactions)) return [];

    return Object.values(networkTransactions).filter(({sender}) => buyer === sender);
  }, [buyer, networkId, orderId, transactions]);

  const remaining = useMemo(() => {
    if (paymentStatus === PaymentStatus.complete) return 0;
    return Math.max(total - getTotalAmount(paymentTransactions), 0);
  }, [paymentStatus, paymentTransactions, total]);

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

  const sortedTransactions = useMemo(() => {
    return orderBy(paymentTransactions, ['date'], ['desc']).map((transaction) => (
      <Transaction key={transaction.id} transaction={transaction} />
    ));
  }, [paymentTransactions]);

  const tableRows = useMemo((): TableRow[] => {
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
        key: 'Seller Receiving Address',
        value: receivingAddress || '-',
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
  }, [approvalStatus, createdDate, paymentExpirationDate, paymentStatus, receivingAddress, renderPaymentStatusBadge]);

  const transferDetailsRows = useMemo((): TickerTableRow[] => {
    return [
      {
        key: 'Total Due',
        value: total,
      },
      {
        key: 'Remaining',
        value: remaining,
      },
    ];
  }, [remaining, total]);

  const renderTransferDetails = () => {
    if (seller === self.accountNumber) return null;
    return (
      <S.TransferDetails networkId={order.networkId} rows={transferDetailsRows} transactions={sortedTransactions} />
    );
  };

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={2} text="Buyer Payment" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
        {renderTransferDetails()}
      </OrderPaymentContent>
    </S.Container>
  );
};

export default BuyerPayment;
