import {DeliveryStatus, Message} from 'apps/Chat/types';
import yup from 'system/utils/forms/yup';

export const setDeliveryStatusValidator = yup.object({
  deliveryStatus: yup
    .string()
    .required()
    .test('is-valid-delivery-status', 'Invalid delivery status', (deliveryStatus: any) => {
      return [DeliveryStatus.error, DeliveryStatus.received].includes(deliveryStatus);
    }),
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
