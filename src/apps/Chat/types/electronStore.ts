import {CHAT_CONTACTS, CHAT_MANAGER, CHAT_MESSAGES} from 'apps/Chat/store/constants';
import {Contacts, Manager, Messages} from 'apps/Chat/types';

export interface ChatElectronStore {
  [CHAT_CONTACTS]: Contacts;
  [CHAT_MANAGER]: Manager;
  [CHAT_MESSAGES]: Messages;
}
