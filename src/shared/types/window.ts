import {IpcRendererApi} from './ipc';

interface ElectronApi {
  ipcRenderer: IpcRendererApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
