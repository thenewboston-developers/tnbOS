import difference from 'lodash/difference';

import {setIncomingLectureRecord} from 'apps/University/store/lectureRecords';
import {unsetLectures} from 'apps/University/store/lectures';
import {universityIdListValidator, universityModifiedDateListValidator} from 'apps/University/validators/common';
import {setLectureRecordValidator} from 'apps/University/validators/setLectureRecordValidators';
import {LectureRecord, Lectures} from 'apps/University/types';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getRemovedLectureIds = (lectureRecord: LectureRecord, existingLectureRecord: LectureRecord) => {
  const existingLectureIds = Object.keys(existingLectureRecord.lectureModifiedDates);
  const lectureIds = Object.keys(lectureRecord.lectureModifiedDates);
  return difference(existingLectureIds, lectureIds);
};

const getUpdatedLectureIds = (lectureRecord: LectureRecord, lectures: Lectures) => {
  const lectureIds = Object.keys(lectureRecord.lectureModifiedDates);

  return lectureIds.filter((lectureId) => {
    const lecture = lectures[lectureId];
    if (!lecture) return true;
    const lectureModifiedDate = lecture.modifiedDate;
    const lectureRecordModifiedDate = lectureRecord.lectureModifiedDates[lectureId];
    return lectureModifiedDate < lectureRecordModifiedDate;
  });
};

const setLectureRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        university: {lectureRecords, lectures},
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

        const removedLectureIds = getRemovedLectureIds(lectureRecord, existingLectureRecord);

        dispatch(unsetLectures(removedLectureIds));

        const updatedLectureIds = getUpdatedLectureIds(lectureRecord, lectures);

        if (!!updatedLectureIds.length) {
          // TODO: send getLectureList() block with these IDs
          console.log(blockSender);
          console.log(networkId);
          console.log(updatedLectureIds);
        }
      }

      // TODO: If student (future) send back lecture record receipt block
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setLectureRecordListener;
