import {ReactNode, useCallback, useMemo} from 'react';

import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import CountdownTimer from 'apps/Shop/components/CountdownTimer';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {ApprovalStatus, Order, PaymentStatus} from 'apps/Shop/types';
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
  const {approvalStatus, createdDate, paymentExpirationDate, paymentStatus, receivingAddress} = order;

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

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={2} text="Buyer Payment" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default BuyerPayment;
