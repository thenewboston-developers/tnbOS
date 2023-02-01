import {setDeliveryStatusBlock} from 'apps/Chat/blocks';
import {setContact} from 'apps/Chat/store/contacts';
import {setMessage} from 'apps/Chat/store/messages';
import {ChatRegistration} from 'apps/Chat/registration';
import {DeliveryStatus} from 'apps/Chat/types';
import {
  setMessageValidator,
  validateBlockRecipient,
  validateBlockSender,
  validateDates,
  validateNetworkIdsMatch,
  validateRecipientIsSelf,
  validateSendersMatch,
} from 'apps/Chat/validators/setMessageValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {currentSystemDate, epochDate} from 'system/utils/dates';
import {displayErrorToast} from 'system/utils/toast';

const setMessageListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, recipient, sender} = block;
      const {params: message} = payload;
      const {
        chat: {contacts, manager: chatManager, messages},
        system: {manager: systemManager, self},
      } = store.getState();

      await setMessageValidator.validate(message);
      validateBlockRecipient(recipient, message.recipient);
      validateBlockSender(sender, message.sender);
      validateDates(message.createdDate, message.modifiedDate);
      validateNetworkIdsMatch(message, networkId);
      validateRecipientIsSelf(recipient, self);

      const existingMessage = messages[message.messageId];

      if (existingMessage) {
        validateSendersMatch(existingMessage, message);
      }

      if (!existingMessage || new Date(message.modifiedDate) > new Date(existingMessage.modifiedDate)) {
        const contact = contacts[sender];
        let lastSeenDate = contact ? contact.lastSeenDate : epochDate();
        const now = currentSystemDate();

        if (systemManager.activeApp === ChatRegistration.appId && chatManager.activeChat === message.sender) {
          lastSeenDate = now;
        }

        dispatch(setMessage(message));

        dispatch(
          setContact({
            accountNumber: sender,
            lastActivityDate: now,
            lastMessageId: message.messageId,
            lastSeenDate,
          }),
        );
      }

      await setDeliveryStatusBlock({
        networkId,
        params: {
          deliveryStatus: DeliveryStatus.received,
          messageId: message.messageId,
        },
        recipient: sender,
      });
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setMessageListener;
