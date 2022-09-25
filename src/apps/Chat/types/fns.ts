import {Message} from 'apps/Chat/types/messages';

export enum ChatFn {
  setDeliveryStatus = 'setDeliveryStatus',
  setMessage = 'setMessage',
}

export type SetMessageParams = Message;
