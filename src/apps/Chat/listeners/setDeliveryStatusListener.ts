import {setDelivery} from 'apps/Chat/store/deliveries';
import {
  setDeliveryStatusValidator,
  validateMessageExists,
  validateMessageRecipient,
} from 'apps/Chat/validators/setDeliveryStatusValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setDeliveryStatusListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender} = block;
      const {params} = payload;
      const {
        chat: {deliveries, messages},
      } = store.getState();

      await setDeliveryStatusValidator.validate(params);

      const delivery = deliveries[params.messageId];
      const message = messages[params.messageId];

      validateMessageExists(message);
      validateMessageRecipient(sender, message.recipient);

      dispatch(
        setDelivery({
          delivery: {
            attempts: delivery.attempts,
            status: params.deliveryStatus,
          },
          messageId: params.messageId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setDeliveryStatusListener;
