import {productIdSchema} from 'apps/Shop/utils/yup';
import yup from 'system/utils/yup';

export const shopIdListValidator = yup.array().of(productIdSchema);

export const shopModifiedDateListValidator = yup.array().of(yup.date().required());
