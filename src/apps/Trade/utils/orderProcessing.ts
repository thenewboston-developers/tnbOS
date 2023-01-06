import setFillStatusBlock from 'apps/Trade/blocks/setFillStatusBlock';
import setPaymentStatusBlock from 'apps/Trade/blocks/setPaymentStatusBlock';
import {setFillStatus, setPaymentStatus} from 'apps/Trade/store/orders';
import {FillStatus, HoldingAccounts, Order, PaymentStatus} from 'apps/Trade/types';
import {removeHold} from 'apps/Trade/utils/holds';
import {createTransaction} from 'apps/Trade/utils/transactions';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {displayErrorToast} from 'system/utils/toast';
import {AppDispatch, Self} from 'system/types';

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

export const handleOrderFulfillment = async (
  dispatch: AppDispatch,
  holdingAccounts: HoldingAccounts,
  order: Order,
  self: Self,
) => {
  try {
    await fillOrder(holdingAccounts, order);
    const setFillStatusParams = {
      fillStatus: FillStatus.complete,
      orderId: order.orderId,
    };
    dispatch(setFillStatus(setFillStatusParams));
    await setFillStatusBlock(order.client.accountNumber, self, setFillStatusParams);
    await removeHold(dispatch, holdingAccounts, order, true, self);
  } catch (error) {
    console.error(error);
    displayErrorToast('Error filling the order');
  }
};

export const handleOrderPayment = async (
  dispatch: AppDispatch,
  hostReceivingAddress: string,
  order: Order,
  self: Self,
) => {
  try {
    await payForOrder(order, hostReceivingAddress, self);
    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.complete,
    };
    dispatch(setPaymentStatus(setPaymentStatusParams));
    await setPaymentStatusBlock(order.host.accountNumber, self, setPaymentStatusParams);
  } catch (error) {
    console.error(error);
    displayErrorToast('Error handling order payment');
    const setPaymentStatusParams = {
      orderId: order.orderId,
      paymentStatus: PaymentStatus.error,
    };
    dispatch(setPaymentStatus(setPaymentStatusParams));
    await setPaymentStatusBlock(order.host.accountNumber, self, setPaymentStatusParams);
  }
};

const payForOrder = async (order: Order, recipient: string, self: Self) => {
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
