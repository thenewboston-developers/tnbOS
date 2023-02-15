import {setPaymentStatus} from 'apps/Shop/store/orders';
import {Order, PaymentStatus} from 'apps/Shop/types';
import {createTransaction} from 'apps/Shop/utils/transactions';
import store from 'system/store';
import {displayErrorToast} from 'system/utils/toast';

interface HandleOrderPayment {
  order: Order;
  receivingAddress: string;
}

export const handleOrderPayment = async ({order, receivingAddress}: HandleOrderPayment) => {
  try {
    await payForOrder({order, receivingAddress});

    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.complete,
    };
    store.dispatch(setPaymentStatus(setPaymentStatusParams));

    // await setPaymentStatusBlock({
    //   networkId,
    //   params: setPaymentStatusParams,
    //   recipient: order.host.accountNumber,
    // });
  } catch (error) {
    console.error(error);
    displayErrorToast('Error handling order payment');

    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.error,
    };
    store.dispatch(setPaymentStatus(setPaymentStatusParams));

    // await setPaymentStatusBlock({
    //   networkId,
    //   params: setPaymentStatusParams,
    //   recipient: order.host.accountNumber,
    // });
  }
};

interface PayForOrder {
  order: Order;
  receivingAddress: string;
}

const payForOrder = async ({order, receivingAddress}: PayForOrder) => {
  const {
    system: {self},
  } = store.getState();

  await createTransaction({
    amount: order.total,
    networkId: order.networkId,
    orderId: order.orderId,
    recipientAccountNumber: receivingAddress,
    senderAccountNumber: self.accountNumber,
    senderSigningKey: self.signingKey,
  });
};
