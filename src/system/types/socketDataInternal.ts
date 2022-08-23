import {Dict} from 'system/types/generic';

export interface CorrelationId {
  correlation_id: string;
}

export interface AuthenticateRequest extends CorrelationId {
  method: SocketDataInternalMethod.authenticate;
  token: string;
}

export interface AuthenticateResponse extends CorrelationId {
  return_value: boolean;
}

export interface GetPeersRequest extends CorrelationId {
  method: SocketDataInternalMethod.get_peers;
}

export interface GetPeersResponse extends CorrelationId {
  return_value: Dict<PeerOnlineStatus>;
}

export interface PeerOnlineStatus {
  is_online: boolean;
}

export interface SetPeersRequest extends CorrelationId {
  method: SocketDataInternalMethod.set_peers;
  peers: string[];
}

export interface SetPeersResponse extends CorrelationId {
  return_value: null;
}

export enum SocketDataInternalMethod {
  authenticate = 'authenticate',
  get_peers = 'get_peers',
  set_peers = 'set_peers',
}

export type SocketDataInternal = AuthenticateResponse | GetPeersResponse | SetPeersResponse;
