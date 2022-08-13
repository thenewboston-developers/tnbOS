import {ipcMain} from 'electron';

import {IpcChannel, LocalElectronStore, SetStoreValuePayload} from '../shared/types';
import {getFailChannel, getSuccessChannel} from '../shared/utils/ipc';
import Store from './Store';

ipcMain.on(IpcChannel.clearStore, (event) => {
  try {
    Store.clear();
    event.reply(getSuccessChannel(IpcChannel.clearStore));
  } catch (error: any) {
    console.log('Failed to clear store', error);
    event.reply(getFailChannel(IpcChannel.clearStore), error.toString());
  }
});

ipcMain.on(IpcChannel.loadStoreData, (event) => {
  try {
    const state = Store.getStore();
    event.reply(getSuccessChannel(IpcChannel.loadStoreData), state);
  } catch (error: any) {
    console.log(`Failed to load store`, error);
    event.reply(getFailChannel(IpcChannel.loadStoreData), error.toString());
  }
});

ipcMain.on(IpcChannel.setStoreValue, (event, {key, state}: SetStoreValuePayload<keyof LocalElectronStore>) => {
  try {
    Store.set(key, state);
    event.reply(getSuccessChannel(IpcChannel.setStoreValue));
  } catch (error: any) {
    console.log(`Failed to set Store of key ${key}`, error);
    event.reply(getFailChannel(IpcChannel.setStoreValue), error.toString());
  }
});
