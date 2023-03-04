import {PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';

export const clearStore = () => {
  window.electron.ipc.send(IpcChannel.clearStore);
};

export const restartApp = () => {
  window.electron.ipc.send(IpcChannel.restartApp);
};

export function setLocalAndStateReducer<T>(sliceName: string) {
  return (_: any, action: PayloadAction<T>) => {
    window.electron.ipc.send(IpcChannel.setStoreValue, {key: sliceName, state: action.payload});
    return action.payload;
  };
}
