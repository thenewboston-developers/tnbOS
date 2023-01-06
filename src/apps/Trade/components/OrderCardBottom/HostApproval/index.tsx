import {ReactNode, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';

import Badge, {BadgeStyle} from 'apps/Trade/components/Badge';
import CountdownTimer from 'apps/Trade/components/CountdownTimer';
import OrderCardBottomContent from 'apps/Trade/components/OrderCardBottomContent';
import OrderCardHeader from 'apps/Trade/components/OrderCardHeader';
import {TableRow} from 'apps/Trade/components/Table';
import {useHoldAmount} from 'apps/Trade/hooks';
import {ApprovalStatus, Order} from 'apps/Trade/types';
import {longDate} from 'system/utils/dates';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

type ApprovalStatusBadgeDict = {
  [key in ApprovalStatus]: ReactNode;
};

interface HostApprovalProps {
  order: Order;
}

const HostApproval: SFC<HostApprovalProps> = ({className, order}) => {
  const holdAmount = useHoldAmount(order);
  const self = useSelector(getSelf);

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

  const tableRows = useMemo(() => {
    let amountOnHoldRow: TableRow[] = [];
    let approvalTimeRemainingRow: TableRow[] = [];

    if (order.host.accountNumber === self.accountNumber) {
      amountOnHoldRow = [
        {
          key: 'Amount On Hold',
          value: `${holdAmount} ${order.host.outgoingAsset}`,
        },
      ];
    }

    if (approvalStatus === ApprovalStatus.pending) {
      approvalTimeRemainingRow = [
        {
          key: 'Approval Time Remaining',
          value: <CountdownTimer endDate={approvalExpirationDate} startDate={createdDate} />,
        },
      ];
    }

    return [
      ...amountOnHoldRow,
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
  }, [
    approvalExpirationDate,
    approvalStatus,
    createdDate,
    holdAmount,
    order.host.accountNumber,
    order.host.outgoingAsset,
    renderApprovalStatusBadge,
    self.accountNumber,
  ]);

  return (
    <S.Container className={className}>
      <OrderCardHeader number={2} text="Host Approval" />
      <OrderCardBottomContent>
        <S.Table rows={tableRows} />
      </OrderCardBottomContent>
    </S.Container>
  );
};

export default HostApproval;
