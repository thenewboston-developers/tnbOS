import {CHAT_CONTACTS, CHAT_DELIVERY_STATUSES, CHAT_MANAGER, CHAT_MESSAGES} from 'apps/Chat/store/constants';
import {Contacts, DeliveryStatuses, Manager, Messages} from 'apps/Chat/types';

export interface ChatElectronStore {
  [CHAT_CONTACTS]: Contacts;
  [CHAT_DELIVERY_STATUSES]: DeliveryStatuses;
  [CHAT_MANAGER]: Manager;
  [CHAT_MESSAGES]: Messages;
}
