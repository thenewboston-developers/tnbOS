import {generateSignature, getKeyPairFromSigningKeyHex} from 'system/utils/tnb';

export const signData = (data: any, signingKeyHex: string) => {
  const {signingKey} = getKeyPairFromSigningKeyHex(signingKeyHex);
  const message = JSON.stringify(data);
  const signature = generateSignature(message, signingKey);
  return {...data, signature};
};
