import {DeliveryStatus} from 'apps/Chat/types/deliveries';
import {Message} from 'apps/Chat/types/messages';

export enum ChatFn {
  setDeliveryStatus = 'setDeliveryStatus',
  setMessage = 'setMessage',
}

export interface SetDeliveryStatusParams {
  deliveryStatus: DeliveryStatus;
  messageId: string;
}

export type SetMessageParams = Message;
