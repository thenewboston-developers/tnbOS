import setCourseWithLecturesPayload from 'apps/University/payloads/setCourseWithLecturesPayload';
import {SetCourseWithLecturesParams} from 'apps/University/types';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {signData} from 'system/utils/signing';

interface SetCoursesBlock {
  networkId: string;
  params: SetCourseWithLecturesParams;
  recipient: string;
}

const setCourseWithLecturesBlock = async ({networkId, params, recipient}: SetCoursesBlock) => {
  const {
    system: {self},
  } = store.getState();

  const data: UnsignedBlock = {
    amount: 0,
    id: crypto.randomUUID(),
    payload: setCourseWithLecturesPayload(params),
    recipient,
    sender: self.accountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, self.signingKey);
  return createBlock(block, networkId);
};

export default setCourseWithLecturesBlock;
