import {courseIdSchema} from 'apps/University/utils/yup';
import yup from 'system/utils/yup';

export const courseIdListValidator = yup.array().of(courseIdSchema);
