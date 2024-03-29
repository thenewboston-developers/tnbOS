import {Order, OrderClient, OrderHost, Orders, PaymentStatus} from 'apps/Trade/types';
import {getLiveBalance} from 'system/utils/liveBalances';

export const validateBlockSenderIsOrderClient = (blockSender: string, orderClient: OrderClient) => {
  if (blockSender !== orderClient.accountNumber) throw new Error('Block sender must match order client account number');
};

export const validateBlockSenderIsOrderHost = (blockSender: string, orderHost: OrderHost) => {
  if (blockSender !== orderHost.accountNumber) throw new Error('Block sender must match order host account number');
};

export const validateOrderExists = (orderId: string, orders: Orders): Order => {
  const order = orders[orderId];
  if (!order) throw new Error('Order does not exist');
  return order;
};

export const validatePayment = async (order: Order, newPaymentStatus: PaymentStatus) => {
  if (newPaymentStatus === PaymentStatus.error) return;

  const clientOutgoingAmount = order.client.outgoingAmount;
  const clientOutgoingAsset = order.client.outgoingAsset;
  const hostReceivingAddress = order.host.receivingAddress!;

  const balance = await getLiveBalance(hostReceivingAddress, clientOutgoingAsset);

  if (newPaymentStatus === PaymentStatus.partial) {
    const isValid = balance > 0 && balance < clientOutgoingAmount;
    if (!isValid) throw new Error(`Partial payment must be greater than 0 and less than ${clientOutgoingAmount}`);
    return;
  }

  if (newPaymentStatus === PaymentStatus.complete) {
    const isValid = balance >= clientOutgoingAmount;
    if (!isValid) throw new Error(`Complete payment must be greater or equal to ${clientOutgoingAmount}`);
    return;
  }

  throw new Error('Error validating payment');
};

export const validateReceivingAddressIsUnique = (orders: Orders, receivingAddress: string) => {
  const accountNumbers = Object.values(orders).reduce((acc: string[], order) => {
    let newAddresses = [order.client.accountNumber, order.client.receivingAddress, order.host.accountNumber];
    if (order.host.receivingAddress) newAddresses = [...newAddresses, order.host.receivingAddress];
    return [...acc, ...newAddresses];
  }, []);
  const accountNumbersSet = new Set(accountNumbers);
  if (accountNumbersSet.has(receivingAddress)) throw new Error('Receiving address provided is not unique');
};
