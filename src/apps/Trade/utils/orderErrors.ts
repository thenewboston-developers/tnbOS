import setOrderErrorBlock from 'apps/Trade/blocks/setOrderErrorBlock';
import {setOrderError} from 'apps/Trade/store/orderErrors';
import store from 'system/store';
import {currentSystemDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';

interface HandleOrderErrorParams {
  err: any;
  networkId: string;
  orderId: string;
  recipient: string;
}

export const handleOrderError = ({err, networkId, orderId, recipient}: HandleOrderErrorParams) => {
  if (!err?.message) return;

  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      const orderError = {
        createdDate: currentSystemDate(),
        creator: self.accountNumber,
        message: err.message,
        orderErrorId: crypto.randomUUID(),
        orderId,
      };

      store.dispatch(setOrderError(orderError));
      await setOrderErrorBlock({networkId, params: orderError, recipient});
    } catch (error) {
      console.error(error);
      displayErrorToast('Error handling order error');
    }
  })();
};
