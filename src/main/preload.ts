import {contextBridge} from 'electron';

import {ipcRendererApi} from './ipc/ipcRenderer';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererApi,
});
