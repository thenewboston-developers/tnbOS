import {Dict} from 'system/types/generic';

export interface Run {
  networkId: string;
  recipient: string;
  requestDate: string;
  responseDate: string | null;
  runId: string;
  status: RunStatus;
}

export type Runs = Dict<Run>;

export enum RunStatus {
  pending = 'pending',
  success = 'success',
  timeout = 'timeout',
}
