import {networkUUIDSchema} from 'system/utils/yup';

export const orderIdSchema = networkUUIDSchema(
  'order-id-is-correct-format',
  'Order ID must follow the correct format of [accountNumber]-[uuid]',
);

export const productIdSchema = networkUUIDSchema(
  'product-id-is-correct-format',
  'Product ID must follow the correct format of [accountNumber]-[uuid]',
);
