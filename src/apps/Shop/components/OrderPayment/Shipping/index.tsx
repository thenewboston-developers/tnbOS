import {useSelector} from 'react-redux';

import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {Order} from 'apps/Shop/types';
import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface ShippingProps {
  order: Order;
}

const Shipping: SFC<ShippingProps> = ({className, order}) => {
  const self = useSelector(getSelf);

  const number = self.accountNumber === order.buyer ? 3 : 4;

  const tableRows: TableRow[] = [
    {
      key: 'Shipping Status',
      value: <Badge badgeStyle={BadgeStyle.warning} text="logic needed" />,
    },
  ];

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={number} text="Shipping" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default Shipping;
