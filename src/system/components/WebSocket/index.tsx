import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'system/routers/rootRouter';
import {getSelf} from 'system/selectors/state';
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
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  const sendAuthenticateRequest = useCallback(
    (socket: ReconnectingWebSocket): void => {
      const correlationId = crypto.randomUUID();

      const payload: AuthenticateRequest = {
        correlation_id: correlationId,
        method: SocketDataInternalMethod.authenticate,
        token: getAuthToken(self),
      };

      dispatch(
        setNetworkCorrelationId({
          correlation_id: correlationId,
          networkId,
          socketDataInternalMethod: SocketDataInternalMethod.authenticate,
        }),
      );

      socket.send(JSON.stringify(payload));
    },
    [dispatch, networkId, self],
  );

  useEffect(() => {
    const socketAddress = getSocketAddress(networkId, protocol, port);
    const socket = new ReconnectingWebSocket(`${socketAddress}/ws/accounts/${self.accountNumber}`);

    socket.onclose = () => {
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.disconnected}));
    };

    socket.onmessage = (event) => {
      rootRouter(dispatch, event, networkId);
    };

    socket.onopen = () => {
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.connected}));
      sendAuthenticateRequest(socket);
    };

    return () => {
      socket.close();
    };
  }, [dispatch, networkId, port, protocol, self.accountNumber, sendAuthenticateRequest]);

  return null;
};

export default WebSocket;
