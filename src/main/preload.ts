import {contextBridge} from 'electron';

import {ipcRendererApi} from 'main/ipc/ipcRenderer';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRendererApi,
});
