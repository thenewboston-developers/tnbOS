import {KeyPairDetails} from 'shared/types';

export const generateAccount = (): KeyPairDetails => {
  return window.electron.tnb.generateAccount();
};

export const generateSignature = (message: string, signingKey: Uint8Array): string => {
  return window.electron.tnb.generateSignature(message, signingKey);
};

export const getKeyPairFromSigningKeyHex = (signingKeyHex: string): KeyPairDetails => {
  return window.electron.tnb.getKeyPairFromSigningKeyHex(signingKeyHex);
};

export const verifySignedData = (signedData: any): boolean => {
  return window.electron.tnb.verifySignedData(signedData);
};
