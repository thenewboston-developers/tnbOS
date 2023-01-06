import {unsetHoldingAccount} from 'apps/Trade/store/holdingAccounts';
import {HoldingAccount, HoldingAccounts, Order} from 'apps/Trade/types';
import {fundHoldingAccount} from 'apps/Trade/utils/holdingAccounts';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {Self} from 'system/types';
import {signData} from 'system/utils/signing';

// TODO: Create interfaces for the rest of these

export const placeHoldOnCrypto = async (amount: number, orderId: string, networkId: string) => {
  return fundHoldingAccount(amount, networkId, orderId);
};

interface RemoveHold {
  holdingAccounts: HoldingAccounts;
  order: Order;
  orderFilled: boolean;
}

export const removeHold = async ({holdingAccounts, order, orderFilled}: RemoveHold) => {
  const {
    system: {self},
  } = store.getState();

  const networkId = order.host.outgoingAsset;
  const holdingAccount = holdingAccounts[order.orderId];
  if (!orderFilled) await returnHoldingAccountFunds(holdingAccount, networkId, self);
  store.dispatch(unsetHoldingAccount(holdingAccount));
  return;
};

const returnHoldingAccountFunds = async (holdingAccount: HoldingAccount, networkId: string, self: Self) => {
  const data: UnsignedBlock = {
    amount: holdingAccount.balance - CORE_TRANSACTION_FEE,
    id: crypto.randomUUID(),
    payload: {},
    recipient: self.accountNumber,
    sender: holdingAccount.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, holdingAccount.signingKey);
  await createBlock(block, networkId);
};
