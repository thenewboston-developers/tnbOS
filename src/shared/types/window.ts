import {IpcApi} from './ipc';
import {TnbApi} from './tnb';

export interface ElectronApi {
  ipc: IpcApi;
  tnb: TnbApi;
}

declare global {
  interface Window {
    electron: ElectronApi;
  }
}
