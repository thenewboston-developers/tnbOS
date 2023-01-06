import setPaymentStatusPayload from 'apps/Trade/payloads/setPaymentStatusPayload';
import {SetPaymentStatusParams} from 'apps/Trade/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetFillStatusBlock {
  networkId: string;
  params: SetPaymentStatusParams;
  recipient: string;
}

const setPaymentStatusBlock = async ({networkId, params, recipient}: SetFillStatusBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setPaymentStatusPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setPaymentStatusBlock;
