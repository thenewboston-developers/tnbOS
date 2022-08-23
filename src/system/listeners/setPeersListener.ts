import store from 'system/store';
import {setPeerRequestDetails} from 'system/store/peerRequestManager';
import {AppDispatch, PeerRequestMethod, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {validateCorrelationIdMatchesLastRequestId} from 'system/validators/common';
import {setPeersValidator} from 'system/validators/setPeersValidators';

const setPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {peerRequestManager},
      } = store.getState();

      const {correlation_id} = await setPeersValidator.validate(socketData);
      validateCorrelationIdMatchesLastRequestId(
        correlation_id,
        networkId,
        peerRequestManager,
        PeerRequestMethod.setPeers,
      );

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
