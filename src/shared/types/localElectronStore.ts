import {AppsElectronStore} from '../../apps/registry';
import {SystemElectronStore} from '../../system/types';

export interface LocalElectronStore extends AppsElectronStore, SystemElectronStore {}
