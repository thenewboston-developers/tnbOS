export interface AccountNumber {
  accountNumber: string;
}

export interface SigningKey {
  signingKey: string;
}

export interface TnbKeyPair extends AccountNumber, SigningKey {}

export interface VerifySignatureParams {
  accountNumber: string;
  signature: string;
  unsignedData: any;
}
