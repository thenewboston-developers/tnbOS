import {
  SYSTEM_ACCOUNTS,
  SYSTEM_BALANCES,
  SYSTEM_MANAGER,
  SYSTEM_NETWORK_BLOCKS,
  SYSTEM_NETWORKS,
  SYSTEM_SELF,
  SYSTEM_SOCKET_STATUSES,
} from 'system/store/constants';
import {Accounts, Balances, Manager, NetworkBlocks, Networks, Self, SocketStatuses} from 'system/types';

export interface SystemElectronStore {
  [SYSTEM_ACCOUNTS]: Accounts;
  [SYSTEM_BALANCES]: Balances;
  [SYSTEM_MANAGER]: Manager;
  [SYSTEM_NETWORK_BLOCKS]: NetworkBlocks;
  [SYSTEM_NETWORKS]: Networks;
  [SYSTEM_SELF]: Self;
  [SYSTEM_SOCKET_STATUSES]: SocketStatuses;
}
