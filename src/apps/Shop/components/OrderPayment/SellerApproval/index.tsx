import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {SFC} from 'system/types';
import * as S from './Styles';

const SellerApproval: SFC = ({className}) => {
  const tableRows: TableRow[] = [
    {
      key: 'Approval Expiration Date',
      value: 'February 7, 2023 at 8:44:10 PM EST',
    },
    {
      key: 'Approval Status',
      value: <Badge badgeStyle={BadgeStyle.success} text="Approved" />,
    },
  ];

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
