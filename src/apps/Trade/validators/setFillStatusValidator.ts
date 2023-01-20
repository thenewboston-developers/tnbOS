import {FillStatus, Order} from 'apps/Trade/types';
import {getLiveBalance} from 'apps/Trade/utils/liveBalances';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import yup from 'system/utils/yup';

export const setFillStatusValidator = yup.object({
  fillStatus: yup
    .string()
    .required()
    .test('is-valid-fill-status', 'Invalid fill status', (fillStatus: any) => {
      const validFillStatuses = [FillStatus.complete, FillStatus.partial];
      return validFillStatuses.includes(fillStatus);
    }),
  orderId: yup.string().required().uuid(),
});

export const validateChangeInFillStatus = (currentFillStatus: FillStatus, newFillStatus: FillStatus) => {
  if (currentFillStatus === newFillStatus) throw new Error('No change in fill status');
};

export const validateFill = async (order: Order, newFillStatus: FillStatus) => {
  const clientReceivingAddress = order.client.receivingAddress;
  const hostOutgoingAmount = order.host.outgoingAmount - CORE_TRANSACTION_FEE;
  const hostOutgoingAsset = order.host.outgoingAsset;

  const balance = await getLiveBalance(clientReceivingAddress, hostOutgoingAsset);

  if (newFillStatus === FillStatus.partial) {
    const isValid = balance > 0 && balance < hostOutgoingAmount;
    if (!isValid) throw new Error(`Partial fill must be greater than 0 and less than ${hostOutgoingAmount}`);
    return;
  }

  if (newFillStatus === FillStatus.complete) {
    const isValid = balance >= hostOutgoingAmount;
    if (!isValid) throw new Error(`Complete fill must be greater or equal to ${hostOutgoingAmount}`);
    return;
  }

  throw new Error('Error validating fill');
};

export const validateFillStatusTransition = (currentFillStatus: FillStatus, newFillStatus: FillStatus) => {
  if (currentFillStatus === FillStatus.none) {
    return [FillStatus.complete, FillStatus.partial].includes(newFillStatus);
  }

  if (currentFillStatus === FillStatus.partial) {
    return newFillStatus === FillStatus.complete;
  }

  throw new Error('Invalid fill status transition');
};
