import {SYSTEM_MANAGER, SYSTEM_NETWORKS, SYSTEM_SELF} from '../../system/store/constants';
import {Manager, Networks, Self} from '../../system/types';

// TODO: export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  [SYSTEM_MANAGER]: Manager;
  [SYSTEM_NETWORKS]: Networks;
  [SYSTEM_SELF]: Self;
}
