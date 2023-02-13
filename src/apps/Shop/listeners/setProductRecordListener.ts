import difference from 'lodash/difference';

import {setIncomingProductRecord} from 'apps/Shop/store/productRecords';
import {unsetProducts} from 'apps/Shop/store/products';
import {ProductRecord, Products} from 'apps/Shop/types';
import {shopIdListValidator, shopModifiedDateListValidator} from 'apps/Shop/validators/common';
import {setProductRecordValidator} from 'apps/Shop/validators/setProductRecordValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getRemovedProductIds = (productRecord: ProductRecord, existingProductRecord?: ProductRecord) => {
  if (!existingProductRecord) return [];
  const existingProductIds = Object.keys(existingProductRecord.productModifiedDates);
  const productIds = Object.keys(productRecord.productModifiedDates);
  return difference(existingProductIds, productIds);
};

const getUpdatedProductIds = (productRecord: ProductRecord, products: Products) => {
  const productIds = Object.keys(productRecord.productModifiedDates);

  return productIds.filter((productId) => {
    const product = products[productId];
    if (!product) return true;
    const productModifiedDate = product.modifiedDate;
    const productRecordModifiedDate = productRecord.productModifiedDates[productId];
    return productModifiedDate < productRecordModifiedDate;
  });
};

const setProductRecordListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        shop: {productRecords, products},
      } = store.getState();

      await setProductRecordValidator.validate(params);
      const {productModifiedDates, recordModifiedDate} = params;

      const productIdList = Object.keys(productModifiedDates);
      const productModifiedDateList = Object.values(productModifiedDates);

      await shopIdListValidator.validate(productIdList);
      await shopModifiedDateListValidator.validate(productModifiedDateList);

      const existingProductRecord = productRecords[blockSender];

      if (!existingProductRecord || existingProductRecord.recordModifiedDate < recordModifiedDate) {
        const productRecord = {productModifiedDates, recordModifiedDate};

        dispatch(
          setIncomingProductRecord({
            productRecord,
            seller: blockSender,
          }),
        );

        const removedProductIds = getRemovedProductIds(productRecord, existingProductRecord);
        const updatedProductIds = getUpdatedProductIds(productRecord, products);

        dispatch(unsetProducts(removedProductIds));

        if (!!updatedProductIds.length) {
          // TODO: Fix
          console.log(networkId);
          console.log(updatedProductIds);
          // await getProductListBlock({
          //   networkId,
          //   params: updatedProductIds,
          //   recipient: blockSender,
          // });
        }
      }

      // await setProductRecordReceiptBlock({
      //   networkId,
      //   params: {recordModifiedDate},
      //   recipient: blockSender,
      // });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setProductRecordListener;
