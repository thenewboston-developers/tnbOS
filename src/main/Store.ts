import ElectronStore from 'electron-store';

import {LocalElectronStore} from '../shared/types';

class Store {
  private static instance = new ElectronStore<LocalElectronStore>();

  public static clear(): void {
    Store.instance.clear();
  }

  public static get<K extends keyof LocalElectronStore>(key: K): LocalElectronStore[K] {
    return Store.instance.get(key);
  }

  public static getStore(): LocalElectronStore {
    return Store.instance.store;
  }

  public static set<K extends keyof LocalElectronStore>(key: K, value: LocalElectronStore[K]): void {
    Store.instance.set(key, value);
  }

  public static setStore(state: LocalElectronStore): void {
    Store.instance.set(state);
  }
}

export default Store;
