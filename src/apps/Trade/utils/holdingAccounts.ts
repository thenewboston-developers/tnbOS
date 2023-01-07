import {setHoldingAccount} from 'apps/Trade/store/holdingAccounts';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';
import {generateAccount} from 'system/utils/tnb';

interface FundHoldingAccount {
  amount: number;
  networkId: string;
  orderId: string;
}

export const fundHoldingAccount = async ({amount, networkId, orderId}: FundHoldingAccount) => {
  const {
    system: {self},
  } = store.getState();
  const keypair = generateAccount();

  const data: UnsignedBlock = {
    amount,
    id: crypto.randomUUID(),
    payload: {},
    recipient: keypair.publicKeyHex,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  await createBlock(block, networkId);

  const holdingAccount = {
    accountNumber: keypair.publicKeyHex,
    balance: amount,
    networkId,
    orderId,
    signingKey: keypair.signingKeyHex,
  };
  store.dispatch(setHoldingAccount(holdingAccount));
};
