import {Message} from 'apps/Chat/types';
import {Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/forms/yup';

const transferSchema = yup.object({
  amount: yup.number().required().integer().min(0),
  networkId: yup.string().required(),
});

export const setMessageValidator = yup.object({
  content: yup.string().defined(),
  createdDate: yup.date().required(),
  messageId: yup.string().required().uuid(),
  modifiedDate: yup.date().required(),
  recipient: accountNumberSchema.required(),
  sender: accountNumberSchema.required(),
  transfer: transferSchema.defined().nullable(),
});

export const validateBlockRecipient = (blockRecipient: string, messageRecipient: string) => {
  if (blockRecipient !== messageRecipient) throw new Error('Block recipient must match message recipient');
};

export const validateBlockSender = (blockSender: string, messageSender: string) => {
  if (blockSender !== messageSender) throw new Error('Block sender must match message sender');
};

export const validateDates = (createdDate: string, modifiedDate: string) => {
  if (new Date(modifiedDate) < new Date(createdDate)) {
    throw new Error('Modified date can not be earlier than the created date');
  }
};

export const validateNetworkIdsMatch = (message: Message, networkId: string) => {
  if (!message.transfer) return;
  if (message.transfer.networkId !== networkId) throw new Error('Invalid networkId');
};

export const validateRecipientIsSelf = (recipient: string, self: Self) => {
  if (recipient !== self.accountNumber) throw new Error('Invalid recipient');
};

export const validateSendersMatch = (existingMessage: Message, message: Message) => {
  if (existingMessage.sender !== message.sender) throw new Error('You do not have permission to edit this message');
};
