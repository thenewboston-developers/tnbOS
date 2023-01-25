import {setCourseRecordRecipient, unsetCourseRecordRecipient} from 'apps/University/store/courseRecordRecipients';
import {setCourseRecordReceiptValidator} from 'apps/University/validators/setCourseRecordReceiptValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setCourseRecordReceiptListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {self},
        university: {courseRecordRecipients, courseRecords},
      } = store.getState();

      await setCourseRecordReceiptValidator.validate(params);
      const {recordModifiedDate} = params;

      const courseRecord = courseRecords[self.accountNumber];
      const courseRecordRecipient = courseRecordRecipients[blockSender];

      if (courseRecord && courseRecord.recordModifiedDate === recordModifiedDate) {
        dispatch(
          setCourseRecordRecipient({
            accountNumber: blockSender,
            delivered: true,
            deliveryAttempts: courseRecordRecipient?.deliveryAttempts || 0,
          }),
        );
      } else {
        dispatch(unsetCourseRecordRecipient(blockSender));
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseRecordReceiptListener;
