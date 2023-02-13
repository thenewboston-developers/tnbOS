import {networkUUIDSchema} from 'system/utils/yup';

export const productIdSchema = networkUUIDSchema(
  'product-id-is-correct-format',
  'Product ID must follow the correct format of [accountNumber]-[uuid]',
);
