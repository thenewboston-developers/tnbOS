import {DEFAULT_SELECT_OPTION} from 'apps/Shop/constants/forms';
import yup from 'system/utils/yup';

export const productValidator = yup.object({
  description: yup.string().required(),
  imageUrl: yup.string().url().required(),
  name: yup.string().required(),
  priceAmount: yup.number().integer().min(0).required(),
  priceNetwork: yup
    .string()
    .required()
    .test(
      'valid-price-network',
      'Price network is a required field',
      (priceNetwork) => priceNetwork !== DEFAULT_SELECT_OPTION,
    ),
});
