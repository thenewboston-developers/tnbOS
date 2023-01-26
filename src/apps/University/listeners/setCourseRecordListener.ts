import difference from 'lodash/difference';

import {getCourseListBlock, setCourseRecordReceiptBlock} from 'apps/University/blocks';
import {unsetCourses} from 'apps/University/store/courses';
import {setIncomingCourseRecord} from 'apps/University/store/courseRecords';
import {unsetEnrollmentsFromCourseIds} from 'apps/University/store/enrollments';
import {unsetLectureRecordsFromCourseIds} from 'apps/University/store/lectureRecords';
import {unsetLecturesFromCourseIds} from 'apps/University/store/lectures';
import {CourseRecord, Courses} from 'apps/University/types';
import {universityIdListValidator, universityModifiedDateListValidator} from 'apps/University/validators/common';
import {setCourseRecordValidator} from 'apps/University/validators/setCourseRecordValidators';
import store from 'system/store';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getRemovedCourseIds = (courseRecord: CourseRecord, existingCourseRecord?: CourseRecord) => {
  if (!existingCourseRecord) return [];
  const existingCourseIds = Object.keys(existingCourseRecord.courseModifiedDates);
  const courseIds = Object.keys(courseRecord.courseModifiedDates);
  return difference(existingCourseIds, courseIds);
};

const getUpdatedCourseIds = (courseRecord: CourseRecord, courses: Courses) => {
  const courseIds = Object.keys(courseRecord.courseModifiedDates);

  return courseIds.filter((courseId) => {
    const course = courses[courseId];
    if (!course) return true;
    const courseModifiedDate = course.modifiedDate;
    const courseRecordModifiedDate = courseRecord.courseModifiedDates[courseId];
    return courseModifiedDate < courseRecordModifiedDate;
  });
};

const setCourseRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        university: {courseRecords, courses},
      } = store.getState();

      await setCourseRecordValidator.validate(params);
      const {courseModifiedDates, recordModifiedDate} = params;

      const courseIdList = Object.keys(courseModifiedDates);
      const courseModifiedDateList = Object.values(courseModifiedDates);

      await universityIdListValidator.validate(courseIdList);
      await universityModifiedDateListValidator.validate(courseModifiedDateList);

      const existingCourseRecord = courseRecords[blockSender];

      if (!existingCourseRecord || existingCourseRecord.recordModifiedDate < recordModifiedDate) {
        const courseRecord = {courseModifiedDates, recordModifiedDate};

        dispatch(
          setIncomingCourseRecord({
            courseRecord,
            instructor: blockSender,
          }),
        );

        const removedCourseIds = getRemovedCourseIds(courseRecord, existingCourseRecord);

        dispatch(unsetEnrollmentsFromCourseIds(removedCourseIds));
        dispatch(unsetLectureRecordsFromCourseIds(removedCourseIds));
        dispatch(unsetLecturesFromCourseIds(removedCourseIds));
        dispatch(unsetCourses(removedCourseIds));

        const updatedCourseIds = getUpdatedCourseIds(courseRecord, courses);

        if (!!updatedCourseIds.length) {
          await getCourseListBlock({
            networkId,
            params: updatedCourseIds,
            recipient: blockSender,
          });
        }
      }

      await setCourseRecordReceiptBlock({
        networkId,
        params: {recordModifiedDate},
        recipient: blockSender,
      });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseRecordListener;
