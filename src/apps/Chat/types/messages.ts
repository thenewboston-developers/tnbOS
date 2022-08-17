export enum DeliveryStatus {
  error = 'error',
  failed = 'failed',
  pending = 'pending',
  received = 'received',
}

export interface Message {
  content: string;
  createdDate: string;
  messageId: string;
  modifiedDate: string;
  recipient: string;
  sender: string;
}
