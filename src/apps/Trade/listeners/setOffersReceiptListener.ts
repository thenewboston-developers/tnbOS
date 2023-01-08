import {setOffersSyncRecipient} from 'apps/Trade/store/offersSync';
import {setOffersReceiptValidator, validateModifiedDate} from 'apps/Trade/validators/setOffersReceiptValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setOffersReceiptListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {trade} = store.getState();
      const offersSync = trade.offersSync;

      await setOffersReceiptValidator.validate(params);
      const {modifiedDate} = params;

      validateModifiedDate(modifiedDate, offersSync);

      dispatch(
        setOffersSyncRecipient({
          accountNumber: blockSender,
          delivered: true,
          deliveryAttempts: 0,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setOffersReceiptListener;
