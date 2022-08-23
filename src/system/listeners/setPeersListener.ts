import {AppDispatch, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {setPeersValidator} from 'system/validators/setPeersValidators';

const setPeersListener = (_dispatch: AppDispatch, _networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      await setPeersValidator.validate(socketData);
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.set_peers} response received`);
    }
  })();
};

export default setPeersListener;
