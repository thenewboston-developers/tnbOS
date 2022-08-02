import ElectronStore from 'electron-store';

import {SystemElectronStore} from 'system/types';

class Store {
  private static instance = new ElectronStore<SystemElectronStore>();

  public static clear(): void {
    Store.instance.clear();
  }

  public static get<K extends keyof SystemElectronStore>(key: K): SystemElectronStore[K] {
    return Store.instance.get(key);
  }

  public static getStore(): SystemElectronStore {
    return Store.instance.store;
  }

  public static set<K extends keyof SystemElectronStore>(key: K, value: SystemElectronStore[K]): void {
    Store.instance.set(key, value);
  }

  public static setStore(state: SystemElectronStore): void {
    Store.instance.set(state);
  }
}

export default Store;
