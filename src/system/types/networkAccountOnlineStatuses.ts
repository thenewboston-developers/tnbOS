import {Dict} from 'system/types/generic';

export interface AccountOnlineStatuses {
  [key: string]: boolean;
}

export type NetworkAccountOnlineStatuses = Dict<AccountOnlineStatuses>;
