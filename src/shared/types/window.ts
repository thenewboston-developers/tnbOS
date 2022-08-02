import {IpcRendererApi} from './ipc';
import {TnbApi} from './tnb';

export interface ElectronApi {
  ipcRenderer: IpcRendererApi;
  tnb: TnbApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
