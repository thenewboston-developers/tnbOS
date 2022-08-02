import {RootState} from 'system/types';

export const getSelf = (state: RootState) => state.system.self;
export const getStoreLoaded = (state: RootState) => state.system.internal.storeLoaded;
