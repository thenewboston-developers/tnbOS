import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ORDER_FILL_STATUS_TASK_RUN_INTERVAL_SECONDS} from 'apps/Trade/constants/protocol';
import {getOrderErrors, getOrders, getReceivingAccounts} from 'apps/Trade/selectors/state';
import {setFillStatus} from 'apps/Trade/store/orders';
import {FillStatus, PaymentStatus} from 'apps/Trade/types';
import {getSelf} from 'system/selectors/state';
import {AppDispatch} from 'system/types';
import {getLiveBalance} from 'system/utils/liveBalances';

const useOrderFillStatusTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderErrors = useSelector(getOrderErrors);
  const orders = useSelector(getOrders);
  const receivingAccounts = useSelector(getReceivingAccounts);
  const self = useSelector(getSelf);

  const ordersPendingFulfillment = useMemo(() => {
    return Object.values(orders)
      .filter(({client}) => client.accountNumber === self.accountNumber)
      .filter(({paymentStatus}) => paymentStatus === PaymentStatus.complete)
      .filter(({fillStatus}) => fillStatus !== FillStatus.complete)
      .filter(({orderId}) => !orderErrors[orderId]);
  }, [orderErrors, orders, self.accountNumber]);

  const run = useCallback(() => {
    (async () => {
      for (const order of ordersPendingFulfillment) {
        let balance = 0;
        const receivingAccount = receivingAccounts[order.host.outgoingAsset][order.orderId];

        try {
          balance = await getLiveBalance(receivingAccount.accountNumber, order.host.outgoingAsset);
        } catch (error) {
          continue;
        }

        if (balance >= order.host.outgoingAmount) {
          dispatch(setFillStatus({fillStatus: FillStatus.complete, orderId: order.orderId}));
          continue;
        }

        if (balance > 0 && order.fillStatus === FillStatus.none) {
          dispatch(setFillStatus({fillStatus: FillStatus.partial, orderId: order.orderId}));
        }
      }
    })();
  }, [dispatch, ordersPendingFulfillment, receivingAccounts]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), ORDER_FILL_STATUS_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOrderFillStatusTask;
