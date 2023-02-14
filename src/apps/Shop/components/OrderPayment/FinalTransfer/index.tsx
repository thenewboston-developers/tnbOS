import Badge, {BadgeStyle} from 'apps/Shop/components/Badge';
import OrderPaymentContent from 'apps/Shop/components/OrderPaymentContent';
import OrderPaymentHeader from 'apps/Shop/components/OrderPaymentHeader';
import {TableRow} from 'apps/Shop/components/Table';
import {SFC} from 'system/types';
import * as S from './Styles';

const FinalTransfer: SFC = ({className}) => {
  const tableRows: TableRow[] = [
    {
      key: 'Transfer Status',
      value: <Badge badgeStyle={BadgeStyle.warning} text="logic needed" />,
    },
  ];

  return (
    <S.Container className={className}>
      <OrderPaymentHeader number={3} text="Final Transfer" />
      <OrderPaymentContent>
        <S.Table rows={tableRows} />
      </OrderPaymentContent>
    </S.Container>
  );
};

export default FinalTransfer;
