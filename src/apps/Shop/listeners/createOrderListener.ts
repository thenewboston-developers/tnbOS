import {Order} from 'apps/Shop/types';
import {validateBlockSenderIsBuyer} from 'apps/Shop/validators/common';
import {
  createOrderValidator,
  validateApprovalExpirationDateIsCorrectValue,
  validateBuyerIsNotSeller,
  validateOrderIdIsUnique,
  validatePaymentExpirationDateIsCorrectValue,
  validateProductsAreAvailable,
  validateSellerIsSelf,
  validateTotal,
} from 'apps/Shop/validators/createOrderValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const createOrderListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        shop: {orders, products},
        system: {self},
      } = store.getState();

      await createOrderValidator.validate(params);
      const order: Order = params;
      const {approvalExpirationDate, buyer, createdDate, orderId, paymentExpirationDate, productIds, seller, total} = order;

      validateApprovalExpirationDateIsCorrectValue(approvalExpirationDate, createdDate);
      validateBlockSenderIsBuyer(blockSender, buyer);
      validateBuyerIsNotSeller(buyer, seller);
      validateOrderIdIsUnique(orderId, orders);
      validatePaymentExpirationDateIsCorrectValue(createdDate, paymentExpirationDate);
      validateProductsAreAvailable(products, productIds);
      validateSellerIsSelf(seller, self);
      validateTotal(products, productIds, total);

      console.log(dispatch);
      console.log(networkId);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default createOrderListener;
