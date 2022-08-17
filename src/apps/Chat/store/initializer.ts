import {LocalElectronStore} from 'shared/types';
import {CHAT_MANAGER} from 'apps/Chat/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/Chat/store/manager';
import {AppDispatch} from 'system/types';

const loadChatStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const storeChatManager = store?.[CHAT_MANAGER] || managerInitialState;
  dispatch(setManager(storeChatManager));
};

export default loadChatStoreData;
