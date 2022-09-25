import {setDeliveryStatusPayload} from 'apps/Chat/payloads';
import {SetDeliveryStatusParams} from 'apps/Chat/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetDeliveryStatusBlock {
  networkId: string;
  params: SetDeliveryStatusParams;
  recipient: string;
}

const setDeliveryStatusBlock = async ({networkId, params, recipient}: SetDeliveryStatusBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setDeliveryStatusPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setDeliveryStatusBlock;
