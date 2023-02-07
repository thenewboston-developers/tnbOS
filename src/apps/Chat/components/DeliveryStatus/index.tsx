import {mdiAlertCircleOutline, mdiCheck, mdiClockOutline} from '@mdi/js';
import MdiIcon from '@mdi/react';

import {colors} from 'apps/Chat/styles';
import {DeliveryStatus as TDeliveryStatus} from 'apps/Chat/types';
import {SFC} from 'system/types';

const icons = {
  [TDeliveryStatus.error]: {
    color: colors.palette.red['300'],
    path: mdiAlertCircleOutline,
  },
  [TDeliveryStatus.failed]: {
    color: colors.palette.orange['300'],
    path: mdiAlertCircleOutline,
  },
  [TDeliveryStatus.pending]: {
    color: colors.palette.gray['300'],
    path: mdiClockOutline,
  },
  [TDeliveryStatus.received]: {
    color: colors.palette.green['300'],
    path: mdiCheck,
  },
};

export interface DeliveryStatusProps {
  deliveryStatus?: TDeliveryStatus;
}

const DeliveryStatus: SFC<DeliveryStatusProps> = ({className, deliveryStatus}) => {
  if (!deliveryStatus) return null;

  const {color, path} = icons[deliveryStatus];

  return <MdiIcon className={className} color={color} path={path} size="14px" />;
};

export default DeliveryStatus;
