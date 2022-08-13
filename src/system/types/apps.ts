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
}

export interface SystemAppRegistration extends AppRegistration {
  iconType: AppIconType.path;
}
