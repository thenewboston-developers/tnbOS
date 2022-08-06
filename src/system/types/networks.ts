import {Id} from 'shared/types';
import {Dict} from 'system/types/generic';
import {IdentificationData} from 'system/types/identification';

export interface Network extends Id, IdentificationData {
  domain: string;
  port?: number;
  protocol: NetworkProtocol;
}

export enum NetworkProtocol {
  http = 'http',
  https = 'https',
}

export type Networks = Dict<Network>;
