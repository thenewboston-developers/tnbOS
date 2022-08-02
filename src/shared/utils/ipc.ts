import {IpcChannel} from 'system/types';

export const getFailChannel = (channel: IpcChannel) => `${channel}-fail`;

export const getSuccessChannel = (channel: IpcChannel) => `${channel}-success`;
