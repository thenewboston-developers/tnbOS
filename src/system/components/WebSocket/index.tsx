import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import NetworkPeerSyncManager from 'system/components/NetworkPeerSyncManager';
import rootRouter from 'system/routers/rootRouter';
import {getSelf, getSocketStatuses} from 'system/selectors/state';
import {setNetworkCorrelationId} from 'system/store/networkCorrelationIds';
import {setSocketStatus} from 'system/store/socketStatuses';
import {
  AppDispatch,
  AuthenticateRequest,
  NetworkProtocol,
  SFC,
  SocketDataInternalMethod,
  SocketStatus,
} from 'system/types';
import {getSocketAddress} from 'system/utils/addresses';
import {getAuthToken} from 'system/utils/auth';

interface WebSocketProps {
  networkId: string;
  port?: number;
  protocol: NetworkProtocol;
}

const WebSocket: SFC<WebSocketProps> = ({networkId, port, protocol}) => {
  const [socketInitialized, setSocketInitialized] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);
  const socketStatuses = useSelector(getSocketStatuses);

  const socket = useMemo((): ReconnectingWebSocket => {
    const socketAddress = getSocketAddress(networkId, protocol, port);
    return new ReconnectingWebSocket(`${socketAddress}/ws/accounts/${self.accountNumber}`);
  }, [networkId, port, protocol, self.accountNumber]);

  const sendAuthenticateRequest = useCallback((): void => {
    const correlationId = crypto.randomUUID();
    const method = SocketDataInternalMethod.authenticate;

    const payload: AuthenticateRequest = {
      correlation_id: correlationId,
      method,
      token: getAuthToken(self),
    };

    dispatch(
      setNetworkCorrelationId({
        correlation_id: correlationId,
        networkId,
        socketDataInternalMethod: method,
      }),
    );

    socket.send(JSON.stringify(payload));
  }, [dispatch, networkId, self, socket]);

  const socketStatus = useMemo(() => {
    return socketStatuses[networkId];
  }, [networkId, socketStatuses]);

  const networkPeerSyncManager = useMemo(() => {
    if (!socket || !socketInitialized || socketStatus !== SocketStatus.authenticated) return null;
    return <NetworkPeerSyncManager networkId={networkId} socket={socket} />;
  }, [networkId, socket, socketInitialized, socketStatus]);

  useEffect(() => {
    if (!socket) return;

    socket.onclose = () => {
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.disconnected}));
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event, networkId);
    };

    socket.onopen = () => {
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.connected}));
      sendAuthenticateRequest();
    };

    setSocketInitialized(true);

    return () => {
      socket.close();
    };
  }, [dispatch, networkId, sendAuthenticateRequest, socket]);

  return <>{networkPeerSyncManager}</>;
};

export default WebSocket;
