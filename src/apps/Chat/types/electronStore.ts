import {CHAT_CONTACTS, CHAT_MANAGER} from 'apps/Chat/store/constants';
import {Contacts, Manager} from 'apps/Chat/types';

export interface ChatElectronStore {
  [CHAT_CONTACTS]: Contacts;
  [CHAT_MANAGER]: Manager;
}
