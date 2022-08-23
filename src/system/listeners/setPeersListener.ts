import store from 'system/store';
import {setPeerRequestDetails} from 'system/store/peerRequestManager';
import {AppDispatch, PeerRequestMethod, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {setPeersValidator, validateLastRequestId} from 'system/validators/setPeersValidators';

const setPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {peerRequestManager},
      } = store.getState();

      const {correlation_id} = await setPeersValidator.validate(socketData);
      validateLastRequestId(correlation_id, networkId, peerRequestManager);

      dispatch(
        setPeerRequestDetails({
          networkId,
          peerRequestDetails: {
            lastResponseId: correlation_id,
          },
          peerRequestMethod: PeerRequestMethod.setPeers,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.set_peers} response received`);
    }
  })();
};

export default setPeersListener;
