import store from 'system/store';
import {setBalance} from 'system/store/balances';
import {AppDispatch, SocketDataStandard} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {updateAccountValidator, validateIsSelfAccountNumber} from 'system/validators/updateAccountValidators';

const updateAccountListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();
      const {message} = await updateAccountValidator.validate(socketData);
      validateIsSelfAccountNumber(message.account_number, self);
      dispatch(setBalance({balance: message.balance, networkId}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating account data');
    }
  })();
};

export default updateAccountListener;
