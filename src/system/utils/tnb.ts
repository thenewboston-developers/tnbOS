import {KeyPairDetails, VerifySignatureParams} from 'shared/types';

export const generateAccount = (): KeyPairDetails => {
  return window.electron.tnb.generateAccount();
};

export const generateSignature = (message: string, signingKey: Uint8Array): string => {
  return window.electron.tnb.generateSignature(message, signingKey);
};

export const getKeyPairFromSigningKeyHex = (signingKeyHex: string): KeyPairDetails => {
  return window.electron.tnb.getKeyPairFromSigningKeyHex(signingKeyHex);
};

export const verifyBlockSignature = (block: any): boolean => {
  return window.electron.tnb.verifyBlockSignature(block);
};

export const verifySignature = ({accountNumber, signature, unsignedData}: VerifySignatureParams): boolean => {
  return window.electron.tnb.verifySignature({accountNumber, signature, unsignedData});
};
