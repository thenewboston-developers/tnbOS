import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getOrders} from 'apps/Shop/selectors/state';
import {ApprovalStatus} from 'apps/Shop/types';

const useUnavailableProductIds = (): string[] => {
  const orders = useSelector(getOrders);

  return useMemo((): string[] => {
    return Object.values(orders).reduce((previousValue: string[], order) => {
      if ([ApprovalStatus.approved, ApprovalStatus.pending].includes(order.approvalStatus)) {
        return [...previousValue, ...order.productIds];
      }
      return previousValue;
    }, []);
  }, [orders]);
};

export default useUnavailableProductIds;
