import {SelfSlice} from '../../system/types';

// export interface LocalElectronStore extends AppsLocalElectronStore, SystemElectronStore {}

export interface LocalElectronStore {
  self: SelfSlice;
}
