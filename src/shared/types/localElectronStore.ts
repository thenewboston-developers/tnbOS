import {Self} from '../../system/types';

// export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  self: Self;
}
