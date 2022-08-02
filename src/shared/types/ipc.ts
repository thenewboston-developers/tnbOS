import {GenericFunction} from './generic';
import {LocalElectronStore} from './localElectronStore';

export interface IpcApi {
  on(channel: string, callback: GenericFunction): void;
  removeListener(channel: string, callback: GenericFunction): void;
  send(channel: string, payload?: any): void;
}

export enum IpcChannel {
  clearStore = 'clear-store',
  loadStoreData = 'load-store-data',
  setStoreValue = 'set-store-value',
}

export type SetStoreValuePayload<K extends keyof LocalElectronStore> = {
  key: K;
  state: LocalElectronStore[K];
};
