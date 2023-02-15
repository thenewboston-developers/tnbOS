import {setProductListBlock, setProductRecordBlock} from 'apps/Shop/blocks';
import {shopIdListValidator} from 'apps/Shop/validators/common';
import {validateProductIds} from 'apps/Shop/validators/getProductListValidators';
import store from 'system/store';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getProductListListener = (block: Block, _: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        shop: {productRecords, products},
        system: {self},
      } = store.getState();

      await shopIdListValidator.validate(params);
      const productIds: string[] = params;

      try {
        validateProductIds(productIds, products, self);
        const _products = productIds.map((productId) => products[productId]);
        await setProductListBlock({
          networkId,
          params: _products,
          recipient: blockSender,
        });
      } catch (error) {
        const productRecord = productRecords[self.accountNumber];
        if (productRecord) {
          await setProductRecordBlock({
            networkId: networkId,
            params: productRecord,
            recipient: blockSender,
          });
        }
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getProductListListener;
