import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS} from 'apps/Trade/constants/protocol';
import {getHoldingAccounts, getOrders} from 'apps/Trade/selectors/state';
import {setPaymentStatus} from 'apps/Trade/store/orders';
import {setResolution} from 'apps/Trade/store/resolutions';
import {ApprovalStatus, PaymentStatus, ResolutionStatus} from 'apps/Trade/types';
import {handleOrderFulfillment} from 'apps/Trade/utils/orderProcessing';
import {validatePayment} from 'apps/Trade/validators/common';
import {getBalances, getNetworkAccountOnlineStatuses, getSelf} from 'system/selectors/state';
import {AppDispatch} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

const useOrderPaymentStatusTask = () => {
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const holdingAccounts = useSelector(getHoldingAccounts);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

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
        const isHost = order.host.accountNumber === self.accountNumber;
        const recipientAccountNumber = isHost ? order.client.accountNumber : order.host.accountNumber;

        if (paymentExpirationDate < now) {
          try {
            await validatePayment(order, PaymentStatus.complete);

            dispatch(
              setPaymentStatus({
                orderId: order.orderId,
                paymentStatus: PaymentStatus.complete,
              }),
            );

            const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
              balances,
              networkAccountOnlineStatuses,
              recipient: recipientAccountNumber,
            });

            if (!recipientsDefaultNetworkId) continue;

            await handleOrderFulfillment({
              holdingAccounts,
              networkId: recipientsDefaultNetworkId,
              order,
            });
          } catch (error) {
            dispatch(
              setPaymentStatus({
                orderId: order.orderId,
                paymentStatus: PaymentStatus.expired,
              }),
            );

            if (isHost) {
              dispatch(
                setResolution({
                  orderId: order.orderId,
                  resolutionStatus: ResolutionStatus.unresolved,
                }),
              );
            }
          }
        }
      }
    })();
  }, [balances, dispatch, holdingAccounts, networkAccountOnlineStatuses, ordersPendingPayment, self.accountNumber]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOrderPaymentStatusTask;
