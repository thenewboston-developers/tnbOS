import {fetchAccount} from 'system/core/accounts';
import store from 'system/store';
import {setBalance} from 'system/store/balances';
import {setSocketStatus} from 'system/store/socketStatuses';
import {AppDispatch, AuthSocketData, SocketStatus} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {authValidator} from 'system/validators/authValidators';

const authListener = (dispatch: AppDispatch, networkId: string, socketData: AuthSocketData) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      await authValidator.validate(socketData);
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.authenticated}));

      try {
        const {balance} = await fetchAccount(self.accountNumber, networkId);
        dispatch(setBalance({balance, networkId}));
      } catch (error) {
        dispatch(setBalance({balance: 0, networkId}));
      }
    } catch (error) {
      console.error(error);
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.error}));
      displayErrorToast('Invalid authentication response received');
    }
  })();
};

export default authListener;
