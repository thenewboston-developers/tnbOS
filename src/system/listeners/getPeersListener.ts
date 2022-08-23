import {AppDispatch, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      console.log('getPeersListener');
      console.log(socketData);
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.get_peers} response received`);
    }
  })();
};

export default getPeersListener;
