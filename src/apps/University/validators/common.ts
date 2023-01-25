import {courseIdSchema} from 'apps/University/utils/yup';
import yup from 'system/utils/yup';

export const universityIdListValidator = yup.array().of(courseIdSchema);

export const universityModifiedDateListValidator = yup.array().of(yup.date().required());
