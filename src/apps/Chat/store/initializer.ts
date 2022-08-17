import {LocalElectronStore} from 'shared/types';
import {CHAT_CONTACTS, CHAT_MANAGER} from 'apps/Chat/store/constants';
import {initialState as contactsInitialState, setContacts} from 'apps/Chat/store/contacts';
import {initialState as managerInitialState, setManager} from 'apps/Chat/store/manager';
import {AppDispatch} from 'system/types';

const loadChatStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const storeContacts = store?.[CHAT_CONTACTS] || contactsInitialState;
  const storeManager = store?.[CHAT_MANAGER] || managerInitialState;
  dispatch(setContacts(storeContacts));
  dispatch(setManager(storeManager));
};

export default loadChatStoreData;
