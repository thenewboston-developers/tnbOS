import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getDeliveries} from 'apps/Chat/selectors/state';
import {DeliveryStatus} from 'apps/Chat/types';

const useDeliveryStatus = (messageId: string): DeliveryStatus | undefined => {
  const deliveries = useSelector(getDeliveries);

  return useMemo(() => {
    const delivery = deliveries[messageId];
    return delivery?.status;
  }, [deliveries, messageId]);
};

export default useDeliveryStatus;
