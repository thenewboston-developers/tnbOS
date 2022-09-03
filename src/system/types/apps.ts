import {Reducer} from '@reduxjs/toolkit';

import {Block, LocalElectronStore} from 'shared/types';
import {Dict} from 'system/types/generic';
import {AppDispatch} from 'system/types/store';

export enum AppIconType {
  image = 'image',
  path = 'path',
}

export interface AppProps {
  display: boolean;
}

export type AppReducers = Dict<Reducer>;

export interface AppRegistration {
  appId: string;
  icon: string;
  iconType: AppIconType;
  initializer?: (dispatch: AppDispatch, store: LocalElectronStore) => void;
  isSystemApp: boolean;
  reducer?: Reducer;
  router?: AppRouter;
}

export type AppRouter = (block: Block, dispatch: AppDispatch, networkId: string) => void;

export type AppRouters = Dict<AppRouter>;

export interface SystemAppRegistration extends AppRegistration {
  iconType: AppIconType.path;
  isSystemApp: true;
}
