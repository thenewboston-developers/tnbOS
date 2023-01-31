import {Dict} from 'system/types/generic';

export interface Contact {
  accountNumber: string;
  lastActivityDate: string;
  lastMessageId?: string;
  lastSeenDate: string;
}

export type Contacts = Dict<Contact>;
