import approveOrderPayload from 'apps/Shop/payloads/approveOrderPayload';
import {ApproveOrderParams} from 'apps/Shop/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface ApproveOrderBlock {
  networkId: string;
  params: ApproveOrderParams;
  recipient: string;
}

const approveOrderBlock = async ({networkId, params, recipient}: ApproveOrderBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: approveOrderPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default approveOrderBlock;
