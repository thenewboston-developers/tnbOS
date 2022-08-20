import {Dict} from 'system/types/generic';

export interface Contact {
  accountNumber: string;
  lastActivityDate: string;
  lastMessageId?: string;
}

export type Contacts = Dict<Contact>;
