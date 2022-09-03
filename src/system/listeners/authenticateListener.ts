import {fetchAccount} from 'system/core/accounts';
import store from 'system/store';
import {setBalance} from 'system/store/balances';
import {setSocketStatus} from 'system/store/socketStatuses';
import {AppDispatch, SocketDataInternal, SocketDataInternalMethod, SocketStatus} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {authenticateValidator} from 'system/validators/authenticateValidators';

const authenticateListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();

      await authenticateValidator.validate(socketData);
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
      displayErrorToast(`Invalid ${SocketDataInternalMethod.authenticate} response received`);
    }
  })();
};

export default authenticateListener;
