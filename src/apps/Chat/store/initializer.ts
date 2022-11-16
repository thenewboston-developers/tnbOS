import {CHAT_CONTACTS, CHAT_DELIVERIES, CHAT_MANAGER, CHAT_MESSAGES} from 'apps/Chat/store/constants';
import {initialState as contactsInitialState, setContacts} from 'apps/Chat/store/contacts';
import {initialState as deliveriesInitialState, setDeliveries} from 'apps/Chat/store/deliveries';
import {initialState as managerInitialState, setManager} from 'apps/Chat/store/manager';
import {initialState as messagesInitialState, setMessages} from 'apps/Chat/store/messages';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadChatStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const contacts = store?.[CHAT_CONTACTS] || contactsInitialState;
  const deliveries = store?.[CHAT_DELIVERIES] || deliveriesInitialState;
  const manager = store?.[CHAT_MANAGER] || managerInitialState;
  const messages = store?.[CHAT_MESSAGES] || messagesInitialState;
  dispatch(setContacts(contacts));
  dispatch(setDeliveries(deliveries));
  dispatch(setManager(manager));
  dispatch(setMessages(messages));
};

export default loadChatStoreData;
