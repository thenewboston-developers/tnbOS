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

const verifySignedData = (signedData: any): boolean => {
  const signature = signedData.signature;
  if (!signature) return false;

  // Block must be recreated to ensure keys are ordered
  const block: UnsignedBlock = {
    amount: signedData.amount,
    id: signedData.id,
    payload: signedData.payload,
    recipient: signedData.recipient,
    sender: signedData.sender,
    transaction_fee: signedData.transaction_fee,
  };

  const strMessage: string = JSON.stringify(block);
  const dataUint8Array = stringToUint8Array(strMessage);
  const signatureUint8Array = Uint8Array.from(Buffer.from(signature, 'hex'));
  const publicKeyUint8Array = Uint8Array.from(Buffer.from(signedData.sender, 'hex'));

  return sign.detached.verify(dataUint8Array, signatureUint8Array, publicKeyUint8Array);
};

export const tnbApi: TnbApi = {
  generateAccount,
  generateSignature,
  getKeyPairDetails,
  getKeyPairFromSigningKeyHex,
  stringToUint8Array,
  verifySignedData,
};
