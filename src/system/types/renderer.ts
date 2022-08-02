import {IpcRendererApi} from 'main/ipc/ipcRenderer';

interface ElectronApi {
  ipcRenderer: IpcRendererApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
