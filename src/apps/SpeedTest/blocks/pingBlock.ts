import {pingPayload} from 'apps/SpeedTest/payloads';
import {PingParams} from 'apps/SpeedTest/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface PingBlock {
  networkId: string;
  params: PingParams;
  recipient: string;
}

const pingBlock = async ({networkId, params, recipient}: PingBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: pingPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default pingBlock;
