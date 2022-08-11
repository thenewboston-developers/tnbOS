import {Dict} from 'system/types/generic';
import {IdentificationData} from 'system/types/identification';

export interface Network extends IdentificationData {
  connectionStatus: NetworkConnectionStatus;
  networkId: string;
  port?: number;
  protocol: NetworkProtocol;
}

export enum NetworkConnectionStatus {
  authenticated = 'authenticated',
  connected = 'connected',
  disconnected = 'disconnected',
  error = 'error',
}

export enum NetworkProtocol {
  http = 'http',
  https = 'https',
}

export type Networks = Dict<Network>;
