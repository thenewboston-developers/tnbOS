import {setIncomingLectureRecord} from 'apps/University/store/lectureRecords';
import {universityIdListValidator, universityModifiedDateListValidator} from 'apps/University/validators/common';
import {setLectureRecordValidator} from 'apps/University/validators/setLectureRecordValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setLectureRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        university: {lectureRecords},
      } = store.getState();

      await setLectureRecordValidator.validate(params);
      const {courseId, lectureRecord} = params;
      const {lectureModifiedDates, recordModifiedDate} = lectureRecord;

      const lectureIdList = Object.keys(lectureModifiedDates);
      const lectureModifiedDateList = Object.values(lectureModifiedDates);

      await universityIdListValidator.validate(lectureIdList);
      await universityModifiedDateListValidator.validate(lectureModifiedDateList);

      const existingLectureRecord = lectureRecords[courseId];

      if (!existingLectureRecord || existingLectureRecord.recordModifiedDate < recordModifiedDate) {
        dispatch(setIncomingLectureRecord({courseId, lectureRecord}));
        // TODO
        // delete any removed lectures from that course
        // get updated lecture IDs
        // send getLectureList() block with those IDs
      }

      // TODO: If student (future) send back lecture record receipt block
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setLectureRecordListener;
