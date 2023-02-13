import {ActivationStatus, Product} from 'apps/Shop/types';
import {productIdSchema} from 'apps/Shop/utils/yup';
import yup, {accountNumberSchema} from 'system/utils/yup';

interface IProduct extends Omit<Product, 'createdDate' | 'modifiedDate'> {
  createdDate: Date;
  modifiedDate: Date;
}

const productValidator: yup.SchemaOf<IProduct> = yup
  .object({
    activationStatus: yup
      .mixed()
      .test(
        'activation-status-is-active',
        'Activation status must be set to active',
        (activationStatus: any) => activationStatus === ActivationStatus.active,
      ),
    createdDate: yup.date().required(),
    description: yup.string().required(),
    imageUrl: yup.string().url().required(),
    modifiedDate: yup.date().required(),
    name: yup.string().required(),
    priceAmount: yup.number().integer().min(0).required(),
    priceNetwork: yup.string().required(),
    productId: productIdSchema,
    seller: accountNumberSchema.required(),
  })
  .noUnknown();

export const setProductListValidator = yup.array().of(productValidator).required();

export const validateSellers = (blockSender: string, productList: Product[]) => {
  if (productList.length === 0) return;
  const sellers = productList.map(({seller}) => seller);
  const sellerSet = new Set(sellers);
  if (sellerSet.size !== 1) throw new Error('Sellers for all products must match');
  const [seller] = sellerSet;
  if (blockSender !== seller) throw new Error('Seller for all products must match the block sender');
};
