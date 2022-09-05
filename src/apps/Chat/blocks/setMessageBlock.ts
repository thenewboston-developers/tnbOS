import {setMessagePayload} from 'apps/Chat/payloads';
import {SetMessageParams} from 'apps/Chat/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetMessageBlock {
  amount: number;
  networkId: string;
  params: SetMessageParams;
  recipient: string;
}

const setMessageBlock = async ({amount, networkId, params, recipient}: SetMessageBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount,
    id: crypto.randomUUID(),
    payload: setMessagePayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  await createBlock(block, networkId);
};

export default setMessageBlock;
