import {PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';

export const clearStore = () => {
  window.electron.ipcRenderer.send(IpcChannel.clearStore);
};

export function setLocalAndStateReducer<T>(sliceName: string) {
  return (_: any, action: PayloadAction<T>) => {
    window.electron.ipcRenderer.send(IpcChannel.setStoreValue, {key: sliceName, state: action.payload});
    return action.payload;
  };
}
