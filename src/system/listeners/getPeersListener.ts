import store from 'system/store';
import {setNetworkAccountOnlineStatuses} from 'system/store/networkAccountOnlineStatuses';
import {setPeerRequestDetails} from 'system/store/peerRequestManager';
import {
  AccountOnlineStatuses,
  AppDispatch,
  Dict,
  PeerOnlineStatus,
  PeerRequestMethod,
  SocketDataInternal,
  SocketDataInternalMethod,
} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import {validateCorrelationIdMatchesLastRequestId} from 'system/validators/common';
import {getPeersValidator} from 'system/validators/getPeersValidators';

const getAccountOnlineStatuses = (returnValue: Dict<PeerOnlineStatus>): AccountOnlineStatuses => {
  return Object.entries(returnValue).reduce((acc, [key, value]) => {
    return {...acc, [key]: value.is_online};
  }, {});
};

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

      dispatch(
        setNetworkAccountOnlineStatuses({
          accountOnlineStatuses: getAccountOnlineStatuses(return_value),
          networkId,
        }),
      );
    } catch (error) {
      console.error(error);
      displayErrorToast(`Invalid ${SocketDataInternalMethod.get_peers} response received`);
    }
  })();
};

export default getPeersListener;
