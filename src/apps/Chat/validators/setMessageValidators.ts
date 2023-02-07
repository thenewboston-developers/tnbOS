import {Message, Transfer} from 'apps/Chat/types';
import {Account, Network, NetworkProtocol, Self} from 'system/types';
import yup, {accountNumberSchema} from 'system/utils/yup';

const accountValidator: yup.SchemaOf<Account> = yup
  .object({
    accountNumber: accountNumberSchema.required(),
    displayImage: yup.string().url().required(),
    displayName: yup.string().required(),
  })
  .noUnknown();

const networkValidator: yup.SchemaOf<Network> = yup
  .object({
    displayImage: yup.string().url().required(),
    displayName: yup.string().required(),
    networkId: yup.string().required(),
    port: yup.number().integer().max(65535).min(0),
    protocol: yup.mixed().oneOf(Object.values(NetworkProtocol)),
  })
  .noUnknown();

const transferValidator: yup.SchemaOf<Transfer> = yup
  .object({
    amount: yup.number().required().integer().min(0),
    networkId: yup.string().required(),
  })
  .noUnknown();

interface IMessage extends Omit<Message, 'createdDate' | 'modifiedDate'> {
  createdDate: Date;
  modifiedDate: Date;
}

export const setMessageValidator: yup.SchemaOf<IMessage> = yup
  .object({
    attachedAccounts: yup.array().of(accountValidator).required(),
    attachedNetworks: yup.array().of(networkValidator).required(),
    content: yup.string().defined(),
    createdDate: yup.date().required(),
    messageId: yup.string().required().uuid(),
    modifiedDate: yup.date().required(),
    recipient: accountNumberSchema.required(),
    sender: accountNumberSchema.required(),
    transfer: transferValidator.defined().nullable(),
  })
  .noUnknown();

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

export const validateRecipientIsSelf = (recipient: string, self: Self) => {
  if (recipient !== self.accountNumber) throw new Error('Invalid recipient');
};

export const validateSendersMatch = (existingMessage: Message, message: Message) => {
  if (existingMessage.sender !== message.sender) throw new Error('You do not have permission to edit this message');
};
