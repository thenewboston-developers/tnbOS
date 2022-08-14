import store from 'system/store';
import {setBalance} from 'system/store/balances';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {updateAccountValidator, validateIsSelfAccountNumber} from 'system/validators/updateAccountValidators';

interface UpdateAccountMessage {
  account_number: string;
  balance: number;
}

const updateAccountListener = (dispatch: AppDispatch, message: UpdateAccountMessage, networkId: string) => {
  (async () => {
    try {
      const {
        system: {self},
      } = store.getState();
      await updateAccountValidator.validate(message);
      validateIsSelfAccountNumber(message.account_number, self);
      dispatch(setBalance({balance: message.balance, networkId}));
    } catch (error) {
      console.error(error);
      displayErrorToast('Error updating account data');
    }
  })();
};

export default updateAccountListener;
