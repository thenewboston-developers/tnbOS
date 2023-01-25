import {setCourseListPayload} from 'apps/University/payloads';
import {Course} from 'apps/University/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetCourseListBlock {
  networkId: string;
  params: Course[];
  recipient: string;
}

const setCourseListBlock = async ({networkId, params, recipient}: SetCourseListBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setCourseListPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setCourseListBlock;
