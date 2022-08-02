import {contextBridge} from 'electron';

import {ipcRendererApi} from './ipcRenderer';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererApi,
});
