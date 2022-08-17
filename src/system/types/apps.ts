import {Reducer} from '@reduxjs/toolkit';

import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types/store';

export enum AppIconType {
  image = 'image',
  path = 'path',
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
}

export interface SystemAppRegistration extends AppRegistration {
  iconType: AppIconType.path;
  isSystemApp: true;
}
