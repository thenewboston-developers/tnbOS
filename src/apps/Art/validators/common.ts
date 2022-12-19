import {Artwork, QueuedBlock} from 'apps/Art/types';
import {verifySignature} from 'system/utils/tnb';

export const validateQueuedBlockSignature = (artwork: Artwork, queuedBlock: QueuedBlock) => {
  const isOutgoingTransfer = artwork.attributes.inTransfer === false && queuedBlock.payload.inTransfer === true;
  const accountNumber = isOutgoingTransfer ? artwork.attributes.owner! : queuedBlock.payload.owner;

  if (
    !verifySignature({
      accountNumber,
      signature: queuedBlock.signature,
      unsignedData: queuedBlock.payload,
    })
  ) {
    throw new Error('Block has been incorrectly signed');
  }
};
