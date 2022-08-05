import {RootState} from 'system/types';

export const getManager = (state: RootState) => state.system.manager;
export const getNetworks = (state: RootState) => state.system.networks;
export const getSelf = (state: RootState) => state.system.self;
export const getStoreLoaded = (state: RootState) => state.system.internal.storeLoaded;
