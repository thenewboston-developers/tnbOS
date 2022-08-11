import {setConnectionStatus} from 'system/store/networks';
import {AppDispatch, AuthSocketData, NetworkConnectionStatus} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {authValidator} from 'system/validators/authValidators';

const authListener = (dispatch: AppDispatch, networkId: string, socketData: AuthSocketData) => {
  (async () => {
    try {
      await authValidator.validate(socketData);
      dispatch(setConnectionStatus({connectionStatus: NetworkConnectionStatus.authenticated, networkId}));
    } catch (error) {
      console.error(error);
      dispatch(setConnectionStatus({connectionStatus: NetworkConnectionStatus.error, networkId}));
      displayErrorToast('Invalid authentication response received');
    }
  })();
};

export default authListener;
