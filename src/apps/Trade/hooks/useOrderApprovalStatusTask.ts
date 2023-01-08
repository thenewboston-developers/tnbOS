import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ORDER_APPROVAL_STATUS_TASK_RUN_INTERVAL_SECONDS} from 'apps/Trade/constants/protocol';
import {getOrders} from 'apps/Trade/selectors/state';
import {setApprovalStatus} from 'apps/Trade/store/orders';
import {ApprovalStatus} from 'apps/Trade/types';
import {AppDispatch} from 'system/types';

const useOrderApprovalStatusTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);

  const ordersPendingApproval = useMemo(() => {
    return Object.values(orders).filter(({approvalStatus}) => approvalStatus === ApprovalStatus.pending);
  }, [orders]);

  const run = useCallback(() => {
    const now = new Date();

    for (const order of ordersPendingApproval) {
      const approvalExpirationDate = new Date(order.approvalExpirationDate);

      if (approvalExpirationDate < now) {
        dispatch(
          setApprovalStatus({
            approvalStatus: ApprovalStatus.expired,
            orderId: order.orderId,
          }),
        );
      }
    }
  }, [dispatch, ordersPendingApproval]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), ORDER_APPROVAL_STATUS_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOrderApprovalStatusTask;
