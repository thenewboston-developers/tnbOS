import {IpcChannel} from 'shared/types';

export const getFailChannel = (channel: IpcChannel) => `${channel}-fail`;

export const getSuccessChannel = (channel: IpcChannel) => `${channel}-success`;
