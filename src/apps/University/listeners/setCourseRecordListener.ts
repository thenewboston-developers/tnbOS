import {setCourseRecordReceiptBlock} from 'apps/University/blocks';
import {setIncomingCourseRecord} from 'apps/University/store/courseRecords';
import {
  courseIdListValidator,
  courseModifiedDateListValidator,
  setCourseRecordValidator,
} from 'apps/University/validators/setCourseRecordValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setCourseRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setCourseRecordValidator.validate(params);
      const {courseModifiedDates, recordModifiedDate} = params;

      const courseIdList = Object.keys(courseModifiedDates);
      const courseModifiedDateList = Object.values(courseModifiedDates);

      await courseIdListValidator.validate(courseIdList);
      await courseModifiedDateListValidator.validate(courseModifiedDateList);

      dispatch(
        setIncomingCourseRecord({
          courseRecord: {courseModifiedDates, recordModifiedDate},
          instructor: blockSender,
        }),
      );

      await setCourseRecordReceiptBlock({
        networkId,
        params: {recordModifiedDate},
        recipient: blockSender,
      });
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseRecordListener;
