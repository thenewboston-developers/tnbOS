import store from 'system/store';
import {setNetworkAccountOnlineStatuses} from 'system/store/networkAccountOnlineStatuses';
import {AppDispatch, OnlineStatus, SocketDataStandard} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {
  trackOnlineStatusValidator,
  validateIsKnownAccount,
  validateIsNotSelfAccountNumber,
} from 'system/validators/trackOnlineStatusValidators';

const trackOnlineStatusListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  (async () => {
    try {
      const {
        system: {accounts, self},
      } = store.getState();

      const {account_number: accountNumber, is_online: isOnline} = await trackOnlineStatusValidator.validate(
        socketData,
      );
      validateIsKnownAccount(accountNumber, accounts);
      validateIsNotSelfAccountNumber(accountNumber, self);

      dispatch(
        setNetworkAccountOnlineStatuses({
          accountOnlineStatuses: {
            [accountNumber]: isOnline ? OnlineStatus.online : OnlineStatus.offline,
          },
          networkId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast('Error tracking online status');
    }
  })();
};

export default trackOnlineStatusListener;
