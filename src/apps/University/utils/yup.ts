import {networkUUIDSchema} from 'system/utils/yup';

export const courseIdSchema = networkUUIDSchema(
  'course-id-is-correct-format',
  'Course ID must follow the correct format of [accountNumber]-[uuid]',
);

export const lectureIdSchema = networkUUIDSchema(
  'lecture-id-is-correct-format',
  'Lecture ID must follow the correct format of [accountNumber]-[uuid]',
);
