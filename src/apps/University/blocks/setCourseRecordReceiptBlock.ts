import {setCourseRecordReceiptPayload} from 'apps/University/payloads';
import {SetCourseRecordReceiptParams} from 'apps/University/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetCourseRecordReceiptBlock {
  networkId: string;
  params: SetCourseRecordReceiptParams;
  recipient: string;
}

const setCourseRecordReceiptBlock = async ({networkId, params, recipient}: SetCourseRecordReceiptBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setCourseRecordReceiptPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setCourseRecordReceiptBlock;
