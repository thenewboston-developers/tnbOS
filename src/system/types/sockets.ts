export interface AuthSocketData {
  result: AuthSocketDataResult;
}

export enum AuthSocketDataResult {
  authenticated = 'authenticated',
  unauthenticated = 'unauthenticated',
}

export interface StandardSocketData {
  message: any;
  type: StandardSocketDataType;
}

export enum StandardSocketDataType {
  createBlock = 'create.block',
  updateAccount = 'update.account',
}

export type SocketData = AuthSocketData | StandardSocketData;
