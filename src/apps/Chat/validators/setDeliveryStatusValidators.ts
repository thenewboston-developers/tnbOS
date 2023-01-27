import {DeliveryStatus, Message, SetDeliveryStatusParams} from 'apps/Chat/types';
import yup from 'system/utils/yup';

export const setDeliveryStatusValidator: yup.SchemaOf<SetDeliveryStatusParams> = yup.object({
  deliveryStatus: yup.mixed().oneOf([DeliveryStatus.error, DeliveryStatus.received]),
  messageId: yup.string().required().uuid(),
});

export const validateMessageExists = (message: Message) => {
  if (!message) throw new Error('Message with that ID does not exist');
};

export const validateMessageRecipient = (blockSender: string, messageRecipient: string) => {
  if (blockSender !== messageRecipient) {
    throw new Error('You do not have permission to set the delivery status for this message');
  }
};
