import {setQueuedBlocksPayload} from 'apps/Art/payloads';
import {SetQueuedBlocksParams} from 'apps/Art/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetQueuedBlocksBlock {
  networkId: string;
  params: SetQueuedBlocksParams;
  recipient: string;
}

const setQueuedBlocksBlock = async ({networkId, params, recipient}: SetQueuedBlocksBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setQueuedBlocksPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setQueuedBlocksBlock;
