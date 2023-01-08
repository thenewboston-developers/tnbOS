import {RootState} from 'system/types';

export const getAccountOnlineStatuses = (state: RootState) => state.system.accountOnlineStatuses;
export const getAccounts = (state: RootState) => state.system.accounts;
export const getBalances = (state: RootState) => state.system.balances;
export const getManager = (state: RootState) => state.system.manager;
export const getNetworkAccountOnlineStatuses = (state: RootState) => state.system.networkAccountOnlineStatuses;
export const getNetworkBlocks = (state: RootState) => state.system.networkBlocks;
export const getNetworks = (state: RootState) => state.system.networks;
export const getPeerRequestManager = (state: RootState) => state.system.peerRequestManager;
export const getSelf = (state: RootState) => state.system.self;
export const getSocketStatuses = (state: RootState) => state.system.socketStatuses;
export const getStoreLoaded = (state: RootState) => state.system.internal.storeLoaded;
