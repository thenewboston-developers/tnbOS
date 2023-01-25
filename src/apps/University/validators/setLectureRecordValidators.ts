import {courseIdSchema} from 'apps/University/utils/yup';
import yup from 'system/utils/yup';

const lectureRecordValidator = yup.object({
  lectureModifiedDates: yup.object().required(),
  recordModifiedDate: yup.date().required(),
});

export const setLectureRecordValidator = yup.object({
  courseId: courseIdSchema,
  lectureRecord: lectureRecordValidator.required(),
});
