import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {SFC} from 'system/types';
import * as S from './Styles';

const BuyerPayment: SFC = ({className}) => {
  const tableRows: TableRow[] = [
    {
      key: 'Seller Receiving Address',
      value: '579c314f574bf3fe6d8d5920239abac80efbe6a9e8e9a3b001ac09765b89aaa0',
    },
    {
      key: 'Payment Expiration Date',
      value: 'February 7, 2023 at 8:44:10 PM EST',
    },
    {
      key: 'Payment Status',
      value: <Badge badgeStyle={BadgeStyle.success} text="Complete" />,
    },
  ];

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