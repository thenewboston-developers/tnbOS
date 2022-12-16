import {Buffer} from 'buffer';
import {sign, SignKeyPair} from 'tweetnacl';

import {KeyPairDetails, TnbApi, UnsignedBlock} from '../../shared/types';

export const generateAccount = (): KeyPairDetails => {
  const keyPair = sign.keyPair();
  return getKeyPairDetails(keyPair);
};

const generateSignature = (message: string, signingKey: Uint8Array): string => {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(message);
  const signatureArray = sign(encodedData, signingKey);
  const signature = Buffer.from(signatureArray).toString('hex');
  return signature.substring(0, 128);
};

const getKeyPairDetails = (keyPair: SignKeyPair): KeyPairDetails => {
  const {publicKey, secretKey: signingKey} = keyPair;
  const publicKeyHex = Buffer.from(publicKey).toString('hex');
  const signingKeyHex = Buffer.from(signingKey).toString('hex');
  return {
    publicKey,
    publicKeyHex,
    signingKey,
    signingKeyHex: signingKeyHex.replace(publicKeyHex, ''),
  };
};

const getKeyPairFromSigningKeyHex = (signingKeyHex: string): KeyPairDetails => {
  const keyPair = sign.keyPair.fromSeed(Buffer.from(signingKeyHex, 'hex'));
  return getKeyPairDetails(keyPair);
};

const stringToUint8Array = (str: string): Uint8Array => {
  const encoder = new TextEncoder();
  return encoder.encode(str);
};

const verifyBlockSignature = (block: any): boolean => {
  const signature = block.signature;
  if (!signature) return false;

  // Block must be recreated to ensure keys are ordered
  const unsignedBlock: UnsignedBlock = {
    amount: block.amount,
    id: block.id,
    payload: block.payload,
    recipient: block.recipient,
    sender: block.sender,
    transaction_fee: block.transaction_fee,
  };

  return verifySignature(block.sender, signature, unsignedBlock);
};

const verifySignature = (accountNumber: string, signature: string, unsignedData: any): boolean => {
  const strMessage: string = JSON.stringify(unsignedData);
  const dataUint8Array = stringToUint8Array(strMessage);
  const signatureUint8Array = Uint8Array.from(Buffer.from(signature, 'hex'));
  const publicKeyUint8Array = Uint8Array.from(Buffer.from(accountNumber, 'hex'));

  return sign.detached.verify(dataUint8Array, signatureUint8Array, publicKeyUint8Array);
};

export const tnbApi: TnbApi = {
  generateAccount,
  generateSignature,
  getKeyPairDetails,
  getKeyPairFromSigningKeyHex,
  stringToUint8Array,
  verifyBlockSignature,
  verifySignature,
};
