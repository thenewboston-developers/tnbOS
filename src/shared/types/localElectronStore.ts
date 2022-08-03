import {SYSTEM_MANAGER, SYSTEM_SELF} from '../../system/store/constants';
import {Manager, Self} from '../../system/types';

// TODO: export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  [SYSTEM_MANAGER]: Manager;
  [SYSTEM_SELF]: Self;
}
