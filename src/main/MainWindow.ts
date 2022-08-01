/* eslint global-require: off, @typescript-eslint/no-var-requires: off */

import {app, BrowserWindow, shell, WebContents} from 'electron';
import path from 'path';

import MenuBuilder from './MenuBuilder';
import {GenericVoidFunction} from '../types';
import {isDevelopment, resolveHtmlPath} from './util';

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

type OnEventType = 'closed' | 'ready-to-show';

class MainWindow {
  private static instance: BrowserWindow | null = null;

  public static async createWindow(): Promise<void> {
    if (isDevelopment) {
      await installExtensions();
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, '../../assets');

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths);
    };

    MainWindow.set(
      new BrowserWindow({
        height: 1080,
        icon: getAssetPath('icon.png'),
        show: false,
        webPreferences: {
          preload: app.isPackaged
            ? path.join(__dirname, 'preload.js')
            : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
        width: 1920,
      }),
    );

    MainWindow.loadURL(resolveHtmlPath('index.html'));

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) {
        throw new Error('"MainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        MainWindow.minimize();
      } else {
        MainWindow.show();
      }
    });

    MainWindow.on('closed', () => {
      MainWindow.set(null);
    });

    const menuBuilder = new MenuBuilder(MainWindow.instance!);
    menuBuilder.buildMenu();

    // Open urls in the user's browser
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url);
      return {action: 'deny'};
    });
  }

  public static exists(): boolean {
    return !!MainWindow.instance;
  }

  public static getWebContents(): WebContents | null {
    return MainWindow.instance?.webContents || null;
  }

  public static loadURL(url: string): void {
    MainWindow.instance?.loadURL(url);
  }

  public static minimize(): void {
    MainWindow.instance?.minimize();
  }

  public static on(event: OnEventType, listener: GenericVoidFunction): void {
    MainWindow.instance?.on(event as any, listener);
  }

  public static set(window: BrowserWindow | null): void {
    MainWindow.instance = window;
  }

  public static show(): void {
    MainWindow.instance?.show();
  }
}

export default MainWindow;
