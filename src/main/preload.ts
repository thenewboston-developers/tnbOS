import {contextBridge} from 'electron';

import {ElectronApi} from '../shared/types';
import {ipcApi} from './bridges/ipc';
import {tnbApi} from './bridges/tnb';

const electronApi: ElectronApi = {
  ipc: ipcApi,
  tnb: tnbApi,
};

contextBridge.exposeInMainWorld('electron', electronApi);
