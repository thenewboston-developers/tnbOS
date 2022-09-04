import {Dict} from 'system/types/generic';

export interface Message {
  content: string;
  createdDate: string;
  messageId: string;
  modifiedDate: string;
  recipient: string;
  sender: string;
}

export type Messages = Dict<Message>;
