import {setProductRecordRecipient, unsetProductRecordRecipient} from 'apps/Shop/store/productRecordRecipients';
import {setProductRecordReceiptValidator} from 'apps/Shop/validators/setProductRecordReceiptValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setProductRecordReceiptListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        shop: {productRecordRecipients, productRecords},
        system: {self},
      } = store.getState();

      await setProductRecordReceiptValidator.validate(params);
      const {recordModifiedDate} = params;

      const productRecord = productRecords[self.accountNumber];
      const productRecordRecipient = productRecordRecipients[blockSender];

      if (productRecord && productRecord.recordModifiedDate === recordModifiedDate) {
        dispatch(
          setProductRecordRecipient({
            accountNumber: blockSender,
            delivered: true,
            deliveryAttempts: productRecordRecipient?.deliveryAttempts || 0,
          }),
        );
      } else {
        dispatch(unsetProductRecordRecipient(blockSender));
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setProductRecordReceiptListener;
