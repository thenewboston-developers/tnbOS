import difference from 'lodash/difference';

import {setCourseRecordReceiptBlock} from 'apps/University/blocks';
import {setIncomingCourseRecord} from 'apps/University/store/courseRecords';
import {CourseRecord} from 'apps/University/types';
import {
  courseIdListValidator,
  courseModifiedDateListValidator,
  setCourseRecordValidator,
} from 'apps/University/validators/setCourseRecordValidators';
import store from 'system/store';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getRemovedCourseIds = (courseRecord: CourseRecord, existingCourseRecord: CourseRecord) => {
  const existingCourseIds = Object.keys(existingCourseRecord.courseModifiedDates);
  const courseIds = Object.keys(courseRecord.courseModifiedDates);
  console.log(difference(existingCourseIds, courseIds));
};

const setCourseRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        university: {courseRecords},
      } = store.getState();

      await setCourseRecordValidator.validate(params);
      const {courseModifiedDates, recordModifiedDate} = params;

      const courseIdList = Object.keys(courseModifiedDates);
      const courseModifiedDateList = Object.values(courseModifiedDates);

      await courseIdListValidator.validate(courseIdList);
      await courseModifiedDateListValidator.validate(courseModifiedDateList);

      const existingCourseRecord = courseRecords[blockSender];

      if (!existingCourseRecord || existingCourseRecord.recordModifiedDate < recordModifiedDate) {
        const courseRecord = {courseModifiedDates, recordModifiedDate};

        dispatch(
          setIncomingCourseRecord({
            courseRecord,
            instructor: blockSender,
          }),
        );

        // get any courses from that instructor that are no longer published
        getRemovedCourseIds(courseRecord, existingCourseRecord);

        // delete those course trees (along with any related course information such as lectures, enrollments, etc...)
      }

      await setCourseRecordReceiptBlock({
        networkId,
        params: {recordModifiedDate},
        recipient: blockSender,
      });

      // for any new/updated courses, fetch the latest data
      // fetch all at once by passing in a list of course IDs
      // actually only need to fetch the courses you don’t already have the latest versions of
      // if request is invalid because user requested course ID of course that does not exist, teacher will respond by
      // sending back an update course record instead of the course data
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseRecordListener;
