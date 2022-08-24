import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getAccounts, getPeerRequestManager} from 'system/selectors/state';
import {deleteNetworkAccountOnlineStatuses} from 'system/store/networkAccountOnlineStatuses';
import {setNetworkCorrelationId} from 'system/store/networkCorrelationIds';
import {
  deleteNetworkPeerRequests,
  initializeNetworkPeerRequests,
  setPeerRequestDetails,
} from 'system/store/peerRequestManager';
import {
  AppDispatch,
  GetPeersRequest,
  PeerRequestDetails,
  PeerRequestMethod,
  SetPeersRequest,
  SFC,
  SocketDataInternalMethod,
} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';

interface NetworkPeerSyncManagerProps {
  networkId: string;
  socket: ReconnectingWebSocket;
}

const NetworkPeerSyncManager: SFC<NetworkPeerSyncManagerProps> = ({networkId, socket}) => {
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const peerRequestManager = useSelector(getPeerRequestManager);

  const accountNumbersString = useMemo(() => Object.keys(accounts).sort().join('-'), [accounts]);

  const accountNumbers = useMemo(() => accountNumbersString.split('-'), [accountNumbersString]);

  const setPeersRequestDetails = useMemo((): PeerRequestDetails | null => {
    const networkPeerRequests = peerRequestManager[networkId];
    return networkPeerRequests ? networkPeerRequests[PeerRequestMethod.setPeers] : null;
  }, [networkId, peerRequestManager]);

  const lastSetPeersRequestId = useMemo((): string | null => {
    if (!setPeersRequestDetails) return null;
    return setPeersRequestDetails.lastRequestId;
  }, [setPeersRequestDetails]);

  const lastSetPeersResponseId = useMemo((): string | null => {
    if (!setPeersRequestDetails) return null;
    return setPeersRequestDetails.lastResponseId;
  }, [setPeersRequestDetails]);

  useEffect(() => {
    dispatch(initializeNetworkPeerRequests(networkId));

    const correlationId = crypto.randomUUID();
    const method = SocketDataInternalMethod.set_peers;

    const payload: SetPeersRequest = {
      correlation_id: correlationId,
      method,
      peers: accountNumbers,
    };

    dispatch(
      setNetworkCorrelationId({
        correlation_id: correlationId,
        networkId,
        socketDataInternalMethod: method,
      }),
    );

    dispatch(
      setPeerRequestDetails({
        networkId,
        peerRequestDetails: {
          lastRequestDate: currentSystemDate(),
          lastRequestId: correlationId,
        },
        peerRequestMethod: PeerRequestMethod.setPeers,
      }),
    );

    socket.send(JSON.stringify(payload));

    return () => {
      dispatch(deleteNetworkAccountOnlineStatuses(networkId));
      dispatch(deleteNetworkPeerRequests(networkId));
    };
  }, [accountNumbers, dispatch, networkId, socket]);

  useEffect(() => {
    if (!lastSetPeersRequestId || !lastSetPeersResponseId || lastSetPeersRequestId !== lastSetPeersResponseId) return;

    const correlationId = crypto.randomUUID();
    const method = SocketDataInternalMethod.get_peers;

    const payload: GetPeersRequest = {
      correlation_id: correlationId,
      method,
    };

    dispatch(
      setNetworkCorrelationId({
        correlation_id: correlationId,
        networkId,
        socketDataInternalMethod: method,
      }),
    );

    dispatch(
      setPeerRequestDetails({
        networkId,
        peerRequestDetails: {
          lastRequestDate: currentSystemDate(),
          lastRequestId: correlationId,
        },
        peerRequestMethod: PeerRequestMethod.getPeers,
      }),
    );

    socket.send(JSON.stringify(payload));
  }, [dispatch, lastSetPeersRequestId, lastSetPeersResponseId, networkId, socket]);

  return null;
};

export default NetworkPeerSyncManager;
