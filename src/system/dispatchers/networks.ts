import {_deleteBalance} from 'system/store/balances';
import {_deleteNetwork} from 'system/store/networks';
import {AppDispatch} from 'system/types';

export const deleteNetwork = (networkId: string) => async (dispatch: AppDispatch) => {
  dispatch(_deleteNetwork(networkId));
  dispatch(_deleteBalance(networkId));
};
