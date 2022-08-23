export interface CreateBlockData {
  message: any;
  type: SocketDataStandardType.createBlock;
}

export interface TrackOnlineStatusData {
  account_number: string;
  is_online: boolean;
  type: SocketDataStandardType.trackOnlineStatus;
}

export interface UpdateAccountData {
  message: UpdateAccountMessage;
  type: SocketDataStandardType.updateAccount;
}

export interface UpdateAccountMessage {
  account_number: string;
  balance: number;
}

export enum SocketDataStandardType {
  createBlock = 'create.block',
  trackOnlineStatus = 'track.online_status',
  updateAccount = 'update.account',
}

export type SocketDataStandard = CreateBlockData | TrackOnlineStatusData | UpdateAccountData;
