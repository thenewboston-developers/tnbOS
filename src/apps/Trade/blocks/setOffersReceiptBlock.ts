import setOffersReceiptPayload from 'apps/Trade/payloads/setOffersReceiptPayload';
import {SetOffersReceiptParams} from 'apps/Trade/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetOffersReceiptBlock {
  networkId: string;
  params: SetOffersReceiptParams;
  recipient: string;
}

const setOffersReceiptBlock = async ({networkId, params, recipient}: SetOffersReceiptBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setOffersReceiptPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setOffersReceiptBlock;
