import {courseIdSchema} from 'apps/University/utils/yup';
import yup from 'system/utils/yup';

export const courseIdListValidator = yup.array().of(courseIdSchema);

export const courseModifiedDateListValidator = yup.array().of(yup.date().required());

export const setCourseRecordValidator = yup.object({
  courseModifiedDates: yup.object().required(),
  recordModifiedDate: yup.date().required(),
});
