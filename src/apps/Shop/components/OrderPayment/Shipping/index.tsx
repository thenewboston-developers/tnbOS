import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {SFC} from 'system/types';
import * as S from './Styles';

const Shipping: SFC = ({className}) => {
  const tableRows: TableRow[] = [
    {
      key: 'Shipping Status',
      value: <Badge badgeStyle={BadgeStyle.warning} text="logic needed" />,
    },
  ];

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={4} text="Shipping" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default Shipping;
