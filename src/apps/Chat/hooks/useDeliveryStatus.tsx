import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getDeliveryStatuses} from 'apps/Chat/selectors/state';
import {DeliveryStatus} from 'apps/Chat/types';

const useDeliveryStatus = (messageId: string): DeliveryStatus | undefined => {
  const deliveryStatuses = useSelector(getDeliveryStatuses);

  return useMemo(() => deliveryStatuses[messageId], [deliveryStatuses, messageId]);
};

export default useDeliveryStatus;
