import setFillStatusBlock from 'apps/Trade/blocks/setFillStatusBlock';
import setPaymentStatusBlock from 'apps/Trade/blocks/setPaymentStatusBlock';
import {setFillStatus, setPaymentStatus} from 'apps/Trade/store/orders';
import {FillStatus, HoldingAccounts, Order, PaymentStatus} from 'apps/Trade/types';
import {removeHold} from 'apps/Trade/utils/holds';
import {createTransaction} from 'apps/Trade/utils/transactions';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import store from 'system/store';
import {displayErrorToast} from 'system/utils/toast';

// TODO: Create interfaces for all of these

const fillOrder = async (holdingAccounts: HoldingAccounts, order: Order) => {
  const clientReceivingAddress = order.client.receivingAddress;
  const hostOutgoingAmount = order.host.outgoingAmount;
  const hostOutgoingAsset = order.host.outgoingAsset;
  const holdingAccount = holdingAccounts[order.orderId];

  await createTransaction({
    amountStr: (hostOutgoingAmount - CORE_TRANSACTION_FEE).toString(),
    networkId: hostOutgoingAsset,
    orderId: order.orderId,
    recipientAccountNumber: clientReceivingAddress,
    senderAccountNumber: holdingAccount.accountNumber,
    senderSigningKey: holdingAccount.signingKey,
  });
};

export const handleOrderFulfillment = async (holdingAccounts: HoldingAccounts, networkId: string, order: Order) => {
  try {
    await fillOrder(holdingAccounts, order);

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
    await removeHold({
      holdingAccounts,
      order,
      orderFilled: true,
    });
  } catch (error) {
    console.error(error);
    displayErrorToast('Error filling the order');
  }
};

export const handleOrderPayment = async (hostReceivingAddress: string, networkId: string, order: Order) => {
  try {
    await payForOrder(order, hostReceivingAddress);
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

const payForOrder = async (order: Order, recipient: string) => {
  const {
    system: {self},
  } = store.getState();

  const clientOutgoingAmount = order.client.outgoingAmount.toString();
  const clientOutgoingAsset = order.client.outgoingAsset;

  await createTransaction({
    amountStr: clientOutgoingAmount,
    networkId: clientOutgoingAsset,
    orderId: order.orderId,
    recipientAccountNumber: recipient,
    senderAccountNumber: self.accountNumber,
    senderSigningKey: self.signingKey,
  });
};
