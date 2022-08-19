import {LocalElectronStore} from 'shared/types';
import {CHAT_CONTACTS, CHAT_MANAGER, CHAT_MESSAGES} from 'apps/Chat/store/constants';
import {initialState as contactsInitialState, setContacts} from 'apps/Chat/store/contacts';
import {initialState as managerInitialState, setManager} from 'apps/Chat/store/manager';
import {initialState as messagesInitialState, setMessages} from 'apps/Chat/store/messages';
import {AppDispatch} from 'system/types';

const loadChatStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const storeContacts = store?.[CHAT_CONTACTS] || contactsInitialState;
  const storeManager = store?.[CHAT_MANAGER] || managerInitialState;
  const storeMessages = store?.[CHAT_MESSAGES] || messagesInitialState;
  dispatch(setContacts(storeContacts));
  dispatch(setManager(storeManager));
  dispatch(setMessages(storeMessages));
};

export default loadChatStoreData;
