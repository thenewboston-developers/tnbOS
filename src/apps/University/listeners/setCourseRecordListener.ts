import difference from 'lodash/difference';

import {setCourseRecordReceiptBlock} from 'apps/University/blocks';
import {unsetCourses} from 'apps/University/store/courses';
import {setIncomingCourseRecord} from 'apps/University/store/courseRecords';
import {unsetEnrollments} from 'apps/University/store/enrollments';
import {unsetLectures} from 'apps/University/store/lectures';
import {CourseRecord, Courses} from 'apps/University/types';
import {courseIdListValidator} from 'apps/University/validators/common';
import {
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

        const removedCourseIds = getRemovedCourseIds(courseRecord, existingCourseRecord);

        dispatch(unsetEnrollments(removedCourseIds));
        dispatch(unsetLectures(removedCourseIds));
        dispatch(unsetCourses(removedCourseIds));

        // for any new/updated courses, fetch the latest data
        // fetch all at once by passing in a list of course IDs
        // actually only need to fetch the courses you do not already have the latest versions of
        const updatedCourseIds = getUpdatedCourseIds(courseRecords, courses);

        if (!!updatedCourseIds.length) {
          // fetch
          console.log(updatedCourseIds);
        }

        // if request is invalid because user requested course ID of course that does not exist, teacher will respond by
        // sending back an update course record instead of the course data
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
