import store from 'system/store';
import {setPeerRequestDetails} from 'system/store/peerRequestManager';
import {AppDispatch, PeerRequestMethod, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {validateCorrelationIdMatchesLastRequestId} from 'system/validators/common';
import {getPeersValidator} from 'system/validators/getPeersValidators';

const getPeersListener = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  (async () => {
    try {
      const {
        system: {peerRequestManager},
      } = store.getState();

      const {correlation_id, return_value} = await getPeersValidator.validate(socketData);
      validateCorrelationIdMatchesLastRequestId(
        correlation_id,
        networkId,
        peerRequestManager,
        PeerRequestMethod.getPeers,
      );

      dispatch(
        setPeerRequestDetails({
          networkId,
          peerRequestDetails: {
            lastResponseId: correlation_id,
          },
          peerRequestMethod: PeerRequestMethod.getPeers,
        }),
      );

      console.warn(networkId);
      console.warn(return_value);
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.get_peers} response received`);
    }
  })();
};

export default getPeersListener;
