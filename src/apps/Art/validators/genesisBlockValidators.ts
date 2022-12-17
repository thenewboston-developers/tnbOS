import {Artwork, QueuedBlock} from 'apps/Art/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';
import {verifySignature} from 'system/utils/tnb';

const artworkIdPayloadSchema = yup.object({
  currentTime: yup.number().required().integer().min(0),
});

const genesisBlockPayloadSchema = yup.object({
  artworkId: yup.string().required(),
  blockId: yup.string().required(),
  createdDate: yup.date().required(),
  description: yup.string().required(),
  imageUrl: yup.string().required(),
  inTransfer: yup.boolean().required(),
  modifiedDate: yup.date().required(),
  name: yup.string().required(),
  owner: accountNumberSchema.required(),
});

export const genesisBlockValidator = yup.object({
  artworkIdPayload: artworkIdPayloadSchema.required(),
  payload: genesisBlockPayloadSchema.required(),
  signature: yup.string().required(),
});

export const validateArtworkIdMatchesBlockId = (queuedBlock: QueuedBlock) => {
  if (queuedBlock.payload.artworkId !== queuedBlock.payload.blockId) {
    throw new Error('Genesis blocks artworkId must match the blockId');
  }
};

export const validateArtworkIdPayloadSignature = (queuedBlock: QueuedBlock) => {
  // The signedArtworkIdPayload.signature is used as the artworkId
  if (
    !verifySignature({
      accountNumber: queuedBlock.payload.owner,
      signature: queuedBlock.payload.artworkId,
      unsignedData: queuedBlock.artworkIdPayload,
    })
  ) {
    throw new Error('Genesis blocks artworkIdPayload has been incorrectly signed');
  }
};

export const validateBlockChainIsEmpty = (artwork: Artwork) => {
  if (!!artwork.headBlockSignature) throw new Error('Blockchain already has blocks');
};

export const validateBlockIsNotInTransfer = (queuedBlock: QueuedBlock) => {
  if (queuedBlock.payload.inTransfer) throw new Error('Genesis block can not be inTransfer');
};

export const validateCreatedDateMatchesModifiedDate = (queuedBlock: QueuedBlock) => {
  if (queuedBlock.payload.createdDate !== queuedBlock.payload.modifiedDate) {
    throw new Error('Genesis blocks createdDate must match the modifiedDate');
  }
};

export const validateCreatorMatchesOwner = (queuedBlock: QueuedBlock) => {
  if (queuedBlock.payload.creator !== queuedBlock.payload.owner) {
    throw new Error('Genesis blocks creator must match the owner');
  }
};

export const validateGenesisBlockSignature = (queuedBlock: QueuedBlock) => {
  if (
    !verifySignature({
      accountNumber: queuedBlock.payload.owner,
      signature: queuedBlock.signature,
      unsignedData: queuedBlock.payload,
    })
  ) {
    throw new Error('Genesis block has been incorrectly signed');
  }
};
