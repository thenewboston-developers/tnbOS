import {QueuedBlock} from 'apps/Art/types';
import {verifySignature} from 'system/utils/tnb';

export const validateQueuedBlockSignature = (queuedBlock: QueuedBlock) => {
  if (
    !verifySignature({
      accountNumber: queuedBlock.payload.owner,
      signature: queuedBlock.signature,
      unsignedData: queuedBlock.payload,
    })
  ) {
    throw new Error('Block has been incorrectly signed');
  }
};
