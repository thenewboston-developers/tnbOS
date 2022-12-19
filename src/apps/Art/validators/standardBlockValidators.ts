import {Artwork, ArtworkAttributes, StandardBlock} from 'apps/Art/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const standardBlockPayloadSchema = yup.object({
  artworkId: yup.string().required(),
  blockId: yup.string().required(),
  description: yup.string(),
  imageUrl: yup.string(),
  inTransfer: yup.boolean(),
  modifiedDate: yup.date().required(),
  name: yup.string(),
  owner: accountNumberSchema.required(),
});

export const standardBlockValidator = yup.object({
  payload: standardBlockPayloadSchema.required(),
  signature: yup.string().required(),
});

export const validateBlockChainIsNotEmpty = (artwork: Artwork) => {
  if (!artwork.headBlockSignature) throw new Error('Blockchain has no genesis block');
};

export const validateIncomingTransfer = (artwork: Artwork, standardBlock: StandardBlock) => {
  const {attributes} = artwork;
  const {payload} = standardBlock;

  if (!(attributes.inTransfer === true && payload.inTransfer === false)) return;

  const payloadKeys: string[] = Object.keys(payload);
  const validPayloadKeys: (keyof ArtworkAttributes)[] = ['artworkId', 'blockId', 'inTransfer', 'modifiedDate'];

  for (const payloadKey of payloadKeys) {
    if (!validPayloadKeys.includes(payloadKey as keyof ArtworkAttributes)) {
      throw new Error(`Can not update ${payloadKey} during a transfer`);
    }
  }

  if (payloadKeys.length !== validPayloadKeys.length) {
    throw new Error('Transfer blocks can not include any non-transfer related attribute updates');
  }
};

export const validateNonMutableValues = (artwork: Artwork, standardBlock: StandardBlock) => {
  const {attributes} = artwork;
  const {payload} = standardBlock;

  const nonMutableValues: (keyof ArtworkAttributes)[] = ['artworkId', 'createdDate', 'creator'];

  for (const key of nonMutableValues) {
    if (payload[key] && attributes[key] !== payload[key]) throw new Error(`Can not update ${key}`);
  }
};

export const validateOutgoingTransfer = (artwork: Artwork, standardBlock: StandardBlock) => {
  const {attributes} = artwork;
  const {payload} = standardBlock;

  if (!(attributes.inTransfer === false && payload.inTransfer === true)) return;
  if (attributes.owner === payload.owner) throw new Error('Owner must be updated during a transfer');

  const payloadKeys: string[] = Object.keys(payload);
  const validPayloadKeys: (keyof ArtworkAttributes)[] = ['artworkId', 'blockId', 'inTransfer', 'modifiedDate', 'owner'];

  for (const payloadKey of payloadKeys) {
    if (!validPayloadKeys.includes(payloadKey as keyof ArtworkAttributes)) {
      throw new Error(`Can not update ${payloadKey} during a transfer`);
    }
  }

  if (payloadKeys.length !== validPayloadKeys.length) {
    throw new Error('Transfer blocks can not include any non-transfer related attribute updates');
  }
};

export const validateOwner = (artwork: Artwork, standardBlock: StandardBlock) => {
  const {attributes} = artwork;
  const {payload} = standardBlock;

  if (attributes.inTransfer === payload.inTransfer && attributes.owner !== payload.owner) {
    throw new Error('Only the owner can make updates');
  }
};
