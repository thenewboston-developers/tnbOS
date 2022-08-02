export interface AccountNumber {
  accountNumber: string;
}

export interface SigningKey {
  signingKey: string;
}

export interface TnbKeyPair extends AccountNumber, SigningKey {}
