import {ReactNode, useCallback, useMemo} from 'react';

import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import CountdownTimer from 'apps/Shop/components/CountdownTimer';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {ApprovalStatus, Order} from 'apps/Shop/types';
import {SFC} from 'system/types';
import {longDate} from 'system/utils/dates';
import * as S from './Styles';

type ApprovalStatusBadgeDict = {
  [key in ApprovalStatus]: ReactNode;
};

export interface SellerApprovalProps {
  order: Order;
}

const SellerApproval: SFC<SellerApprovalProps> = ({className, order}) => {
  const {approvalExpirationDate, approvalStatus, createdDate} = order;

  const renderApprovalStatusBadge = useCallback(() => {
    const approvalStatusBadges: ApprovalStatusBadgeDict = {
      [ApprovalStatus.approved]: <Badge badgeStyle={BadgeStyle.success} text="Approved" />,
      [ApprovalStatus.error]: <Badge badgeStyle={BadgeStyle.danger} text="Error" />,
      [ApprovalStatus.expired]: <Badge badgeStyle={BadgeStyle.dark} text="Expired" />,
      [ApprovalStatus.pending]: <Badge badgeStyle={BadgeStyle.info} text="Pending" />,
    };
    return approvalStatusBadges[approvalStatus];
  }, [approvalStatus]);

  const tableRows = useMemo((): TableRow[] => {
    let approvalTimeRemainingRow: TableRow[] = [];

    if (approvalStatus === ApprovalStatus.pending) {
      approvalTimeRemainingRow = [
        {
          key: 'Approval Time Remaining',
          value: <CountdownTimer endDate={approvalExpirationDate} startDate={createdDate} />,
        },
      ];
    }

    return [
      {
        key: 'Approval Expiration Date',
        value: longDate(approvalExpirationDate),
      },
      ...approvalTimeRemainingRow,
      {
        key: 'Approval Status',
        value: renderApprovalStatusBadge(),
      },
    ];
  }, [approvalExpirationDate, approvalStatus, createdDate, renderApprovalStatusBadge]);

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={1} text="Seller Approval" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default SellerApproval;
