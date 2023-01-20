import {Artwork, GenesisBlock} from 'apps/Art/types';
import {verifySignature} from 'system/utils/tnb';
import yup, {accountNumberSchema} from 'system/utils/yup';

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

export const validateArtworkIdMatchesBlockId = (genesisBlock: GenesisBlock) => {
  if (genesisBlock.payload.artworkId !== genesisBlock.payload.blockId) {
    throw new Error('Genesis blocks artworkId must match the blockId');
  }
};

export const validateArtworkIdPayloadSignature = (genesisBlock: GenesisBlock) => {
  // The signedArtworkIdPayload.signature is used as the artworkId
  if (
    !verifySignature({
      accountNumber: genesisBlock.payload.owner,
      signature: genesisBlock.payload.artworkId,
      unsignedData: genesisBlock.artworkIdPayload,
    })
  ) {
    throw new Error('Genesis blocks artworkIdPayload has been incorrectly signed');
  }
};

export const validateBlockChainIsEmpty = (artwork: Artwork) => {
  if (!!artwork.headBlockSignature) throw new Error('Blockchain already has blocks');
};

export const validateBlockIsNotInTransfer = (genesisBlock: GenesisBlock) => {
  if (genesisBlock.payload.inTransfer) throw new Error('Genesis block can not be inTransfer');
};

export const validateCreatedDateMatchesModifiedDate = (genesisBlock: GenesisBlock) => {
  if (genesisBlock.payload.createdDate !== genesisBlock.payload.modifiedDate) {
    throw new Error('Genesis blocks createdDate must match the modifiedDate');
  }
};

export const validateCreatorMatchesOwner = (genesisBlock: GenesisBlock) => {
  if (genesisBlock.payload.creator !== genesisBlock.payload.owner) {
    throw new Error('Genesis blocks creator must match the owner');
  }
};
