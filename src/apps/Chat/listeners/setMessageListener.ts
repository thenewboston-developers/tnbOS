import {setContact} from 'apps/Chat/store/contacts';
import {setMessage} from 'apps/Chat/store/messages';
import {setMessageValidator} from 'apps/Chat/validators/setMessageValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';

const setMessageListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender} = block;
      const {params: message} = payload;
      const {
        chat: {messages},
      } = store.getState();

      await setMessageValidator.validate(message);

      const existingMessage = messages[message.messageId];

      if (!existingMessage || new Date(message.modifiedDate) > new Date(existingMessage.modifiedDate)) {
        dispatch(setMessage(message));
        dispatch(
          setContact({
            accountNumber: sender,
            lastActivityDate: currentSystemDate(),
            lastMessageId: message.messageId,
          }),
        );
      }

      console.log(networkId);

      // Send message receipt
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setMessageListener;
