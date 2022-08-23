import {useCallback, useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getAccounts} from 'system/selectors/state';
import {setNetworkCorrelationId} from 'system/store/networkCorrelationIds';
import {initializeNetworkPeerRequests} from 'system/store/peerRequestManager';
import {AppDispatch, SetPeersRequest, SFC, SocketDataInternalMethod} from 'system/types';

interface NetworkPeerSyncManagerProps {
  networkId: string;
  socket: ReconnectingWebSocket;
}

const NetworkPeerSyncManager: SFC<NetworkPeerSyncManagerProps> = ({networkId, socket}) => {
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();

  const accountNumbersString = useMemo(() => Object.keys(accounts).sort().join('-'), [accounts]);

  const accountNumbers = useMemo(() => accountNumbersString.split('-'), [accountNumbersString]);

  const sendSetPeersRequest = useCallback((): void => {
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

    socket.send(JSON.stringify(payload));
  }, [accountNumbers, dispatch, networkId, socket]);

  useEffect(() => {
    dispatch(initializeNetworkPeerRequests(networkId));
    sendSetPeersRequest();
  }, [dispatch, networkId, sendSetPeersRequest]);

  return null;
};

export default NetworkPeerSyncManager;
