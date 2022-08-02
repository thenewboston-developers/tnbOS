import {contextBridge} from 'electron';

import {ElectronApi} from '../shared/types';
import {ipcRendererApi} from './bridges/ipcRenderer';
import {tnbApi} from './bridges/tnb';

const electronApi: ElectronApi = {
  ipcRenderer: ipcRendererApi,
  tnb: tnbApi,
};

contextBridge.exposeInMainWorld('electron', electronApi);
