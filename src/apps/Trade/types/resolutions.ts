import {Dict} from 'system/types';

export interface Resolution {
  orderId: string;
  resolutionStatus: ResolutionStatus;
}

export enum ResolutionStatus {
  cancelled = 'cancelled',
  filled = 'filled',
  unresolved = 'unresolved',
}

export type Resolutions = Dict<Resolution>;
