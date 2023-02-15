import {ActivationStatus, Products} from 'apps/Shop/types';
import {Self} from 'system/types';

export const validateProductIds = (productIds: string[], products: Products, self: Self) => {
  for (const productId of productIds) {
    const product = products[productId];
    if (!product) throw new Error('Product does not exist');
    if (product.seller !== self.accountNumber) throw new Error('Self is not the seller for requested product');
    if (product.activationStatus !== ActivationStatus.active) throw new Error('Product is not active');
  }
};
