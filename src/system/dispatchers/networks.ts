import {_deleteBalance, _initializeBalance} from 'system/store/balances';
import {_deleteNetwork} from 'system/store/networks';
import {_deleteSocketStatus, _initializeSocketStatus} from 'system/store/socketStatuses';
import {AppDispatch} from 'system/types';

export const deleteNetwork = (networkId: string) => async (dispatch: AppDispatch) => {
  dispatch(_deleteNetwork(networkId));
  dispatch(_deleteBalance(networkId));
  dispatch(_deleteSocketStatus(networkId));
};

export const initializeNetworkRelatedObjects = (networkId: string) => async (dispatch: AppDispatch) => {
  dispatch(_initializeBalance(networkId));
  dispatch(_initializeSocketStatus(networkId));
};
