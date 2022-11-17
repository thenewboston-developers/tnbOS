import {Dict} from 'system/types/generic';

export interface Run {
  networkId: string;
  recipient: string;
  requestDate: string;
  requestTime: number;
  responseTime: number | null;
  runId: string;
  status: RunStatus;
}

export type Runs = Dict<Run>;

export enum RunStatus {
  error = 'error',
  pending = 'pending',
  success = 'success',
  timeout = 'timeout',
}
