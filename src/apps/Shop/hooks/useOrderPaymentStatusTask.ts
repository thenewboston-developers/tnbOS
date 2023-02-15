import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS} from 'apps/Shop/constants/protocol';
import {getOrders} from 'apps/Shop/selectors/state';
import {setPaymentStatus} from 'apps/Shop/store/orders';
import {ApprovalStatus, PaymentStatus} from 'apps/Shop/types';
import {validatePayment} from 'apps/Shop/validators/common';
import {AppDispatch} from 'system/types';

const useOrderPaymentStatusTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);

  const ordersPendingPayment = useMemo(() => {
    return Object.values(orders).filter(({approvalStatus, paymentStatus}) => {
      return (
        approvalStatus === ApprovalStatus.approved &&
        [PaymentStatus.none, PaymentStatus.partial].includes(paymentStatus)
      );
    });
  }, [orders]);

  const run = useCallback(() => {
    (async () => {
      const now = new Date();

      for (const order of ordersPendingPayment) {
        const paymentExpirationDate = new Date(order.paymentExpirationDate);

        if (paymentExpirationDate < now) {
          try {
            await validatePayment(order, PaymentStatus.complete);
            dispatch(
              setPaymentStatus({
                orderId: order.orderId,
                paymentStatus: PaymentStatus.complete,
              }),
            );
          } catch (error) {
            dispatch(
              setPaymentStatus({
                orderId: order.orderId,
                paymentStatus: PaymentStatus.expired,
              }),
            );
          }
        }
      }
    })();
  }, [dispatch, ordersPendingPayment]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOrderPaymentStatusTask;
