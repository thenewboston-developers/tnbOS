import {ipcRenderer} from 'electron';

import {IpcChannel, IpcRendererApi} from '../shared/types';
import {getFailChannel, getSuccessChannel} from '../shared/utils/ipc';

const baseValidChannels = [IpcChannel.clearStore, IpcChannel.loadStoreData, IpcChannel.setStoreValue];
const failValidChannels = baseValidChannels.map(getFailChannel);
const successValidChannels = baseValidChannels.map(getSuccessChannel);
const validChannels = [...baseValidChannels, ...failValidChannels, ...successValidChannels];

const on = (channel: string, func: any) => {
  if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.on(channel, (_, ...args) => func(...args));
  }
};

const removeListener = (channel: string, func: any) => {
  if (validChannels.includes(channel)) {
    // Deliberately strip event as it includes `sender`
    ipcRenderer.removeListener(channel, (_, ...args) => func(...args));
  }
};

const send = (channel: string, payload: any) => {
  if (validChannels.includes(channel)) {
    ipcRenderer.send(channel, payload);
  }
};

export const ipcRendererApi: IpcRendererApi = {
  on,
  removeListener,
  send,
};
