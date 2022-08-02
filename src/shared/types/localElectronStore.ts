import {SYSTEM_SELF} from '../../system/store/constants';
import {Self} from '../../system/types';

// export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  [SYSTEM_SELF]: Self;
}
