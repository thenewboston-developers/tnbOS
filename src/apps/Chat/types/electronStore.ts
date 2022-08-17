import {CHAT_MANAGER} from 'apps/Chat/store/constants';
import {Manager} from 'apps/Chat/types';

export interface ChatElectronStore {
  [CHAT_MANAGER]: Manager;
}
