import {Reducer} from '@reduxjs/toolkit';

import {Block, LocalElectronStore} from 'shared/types';
import {Dict} from 'system/types/generic';
import {AppDispatch} from 'system/types/store';

export type AppDataHandler = (block: Block, dispatch: AppDispatch, networkId: string) => void;

export type AppDataHandlers = Dict<AppDataHandler>;

export enum AppIconType {
  image = 'image',
  path = 'path',
}

export interface AppPayload {
  fn: string;
  params: any;
  pid: string;
}

export interface AppProps {
  display: boolean;
}

export interface AppRegistration {
  appId: string;
  icon: string;
  iconType: AppIconType;
  initializer?: (dispatch: AppDispatch, store: LocalElectronStore) => void;
  isSystemApp: boolean;
  reducer?: Reducer;
  router?: AppDataHandler;
}

export interface SystemAppRegistration extends AppRegistration {
  iconType: AppIconType.path;
  isSystemApp: true;
}
