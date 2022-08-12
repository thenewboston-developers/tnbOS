import {RootState} from 'system/types';

export const getAccounts = (state: RootState) => state.system.accounts;
export const getBalances = (state: RootState) => state.system.balances;
export const getManager = (state: RootState) => state.system.manager;
export const getNetworks = (state: RootState) => state.system.networks;
export const getSelf = (state: RootState) => state.system.self;
export const getStoreLoaded = (state: RootState) => state.system.internal.storeLoaded;
