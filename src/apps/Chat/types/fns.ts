import {Message} from 'apps/Chat/types/messages';

export enum ChatFn {
  setMessage = 'setMessage',
  setMessageReceipt = 'setMessageReceipt',
}

export type SetMessageParams = Message;
