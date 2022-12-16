import {SignKeyPair} from 'tweetnacl';

export interface KeyPairDetails {
  publicKey: Uint8Array;
  publicKeyHex: string;
  signingKey: Uint8Array;
  signingKeyHex: string;
}

export interface TnbApi {
  generateAccount(): KeyPairDetails;
  generateSignature(message: string, signingKey: Uint8Array): string;
  getKeyPairDetails(keyPair: SignKeyPair): KeyPairDetails;
  getKeyPairFromSigningKeyHex(signingKeyHex: string): KeyPairDetails;
  stringToUint8Array(str: string): Uint8Array;
  verifyBlockSignature(block: any): boolean;
  verifySignature(accountNumber: string, signature: string, unsignedData: any): boolean;
}
