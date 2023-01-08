import setFillStatusBlock from 'apps/Trade/blocks/setFillStatusBlock';
import setPaymentStatusBlock from 'apps/Trade/blocks/setPaymentStatusBlock';
import {setHoldingAccount} from 'apps/Trade/store/holdingAccounts';
import {setFillStatus, setPaymentStatus} from 'apps/Trade/store/orders';
import {FillStatus, HoldingAccounts, Order, PaymentStatus} from 'apps/Trade/types';
import {createTransaction} from 'apps/Trade/utils/transactions';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import store from 'system/store';
import {displayErrorToast} from 'system/utils/toast';

interface FillOrder {
  holdingAccounts: HoldingAccounts;
  order: Order;
}

const fillOrder = async ({holdingAccounts, order}: FillOrder) => {
  const holdingAccount = holdingAccounts[order.host.outgoingAsset][order.orderId];

  await createTransaction({
    amount: order.host.outgoingAmount - CORE_TRANSACTION_FEE,
    networkId: order.host.outgoingAsset,
    orderId: order.orderId,
    recipientAccountNumber: order.client.receivingAddress,
    senderAccountNumber: holdingAccount.accountNumber,
    senderSigningKey: holdingAccount.signingKey,
  });

  store.dispatch(setHoldingAccount({...holdingAccount, fundsTransferredOut: true}));
};

interface HandleOrderFulfillment {
  holdingAccounts: HoldingAccounts;
  networkId: string;
  order: Order;
}

export const handleOrderFulfillment = async ({holdingAccounts, networkId, order}: HandleOrderFulfillment) => {
  try {
    await fillOrder({holdingAccounts, order});

    const setFillStatusParams = {
      fillStatus: FillStatus.complete,
      orderId: order.orderId,
    };
    store.dispatch(setFillStatus(setFillStatusParams));

    await setFillStatusBlock({
      networkId,
      params: setFillStatusParams,
      recipient: order.client.accountNumber,
    });
  } catch (error) {
    console.error(error);
    displayErrorToast('Error filling the order');
  }
};

interface HandleOrderPayment {
  hostReceivingAddress: string;
  networkId: string;
  order: Order;
}

export const handleOrderPayment = async ({hostReceivingAddress, networkId, order}: HandleOrderPayment) => {
  try {
    await payForOrder({
      order,
      recipient: hostReceivingAddress,
    });

    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.complete,
    };
    store.dispatch(setPaymentStatus(setPaymentStatusParams));

    await setPaymentStatusBlock({
      networkId,
      params: setPaymentStatusParams,
      recipient: order.host.accountNumber,
    });
  } catch (error) {
    console.error(error);
    displayErrorToast('Error handling order payment');

    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.error,
    };
    store.dispatch(setPaymentStatus(setPaymentStatusParams));

    await setPaymentStatusBlock({
      networkId,
      params: setPaymentStatusParams,
      recipient: order.host.accountNumber,
    });
  }
};

interface PayForOrder {
  order: Order;
  recipient: string;
}

const payForOrder = async ({order, recipient}: PayForOrder) => {
  const {
    system: {self},
  } = store.getState();

  await createTransaction({
    amount: order.client.outgoingAmount,
    networkId: order.client.outgoingAsset,
    orderId: order.orderId,
    recipientAccountNumber: recipient,
    senderAccountNumber: self.accountNumber,
    senderSigningKey: self.signingKey,
  });
};
