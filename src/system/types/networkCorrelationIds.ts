import {Dict} from 'system/types/generic';
import {SocketDataInternalMethod} from 'system/types/socketDataInternal';

export interface InternalRequestMapping {
  [key: string]: SocketDataInternalMethod;
}

export type NetworkCorrelationIds = Dict<InternalRequestMapping>;
