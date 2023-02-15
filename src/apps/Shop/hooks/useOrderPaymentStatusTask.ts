import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS} from 'apps/Shop/constants/protocol';
import {getOrderProducts, getOrders} from 'apps/Shop/selectors/state';
import {setPaymentStatus} from 'apps/Shop/store/orders';
import {resetProductRecordRecipients} from 'apps/Shop/store/productRecordRecipients';
import {setSelfProductRecords} from 'apps/Shop/store/productRecords';
import {setProductList} from 'apps/Shop/store/products';
import {ApprovalStatus, Order, PaymentStatus, Product} from 'apps/Shop/types';
import {validatePayment} from 'apps/Shop/validators/common';
import {getSelf} from 'system/selectors/state';
import {AppDispatch} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {generateNetworkUUID} from 'system/utils/uuid';

const useOrderPaymentStatusTask = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orderProducts = useSelector(getOrderProducts);
  const orders = useSelector(getOrders);
  const self = useSelector(getSelf);

  const cloneOrderProductsToProducts = useCallback(
    (order: Order) => {
      const productList: Product[] = order.productIds.map((productId) => ({
        ...orderProducts[productId],
        productId: generateNetworkUUID(),
      }));

      dispatch(setProductList(productList));

      dispatch(
        setSelfProductRecords({
          modifiedDate: currentSystemDate(),
          productIds: productList.map(({productId}) => productId),
          seller: self.accountNumber,
        }),
      );

      dispatch(resetProductRecordRecipients());
    },
    [dispatch, orderProducts, self.accountNumber],
  );

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

            if (order.seller === self.accountNumber) {
              cloneOrderProductsToProducts(order);
            }
          }
        }
      }
    })();
  }, [cloneOrderProductsToProducts, dispatch, ordersPendingPayment, self.accountNumber]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), ORDER_PAYMENT_STATUS_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOrderPaymentStatusTask;
