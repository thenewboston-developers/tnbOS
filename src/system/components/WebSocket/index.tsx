import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import rootRouter from 'system/routers/rootRouter';
import {getSelf} from 'system/selectors/state';
import {setSocketStatus} from 'system/store/socketStatuses';
import {AppDispatch, NetworkProtocol, SFC, SocketStatus} from 'system/types';
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

  useEffect(() => {
    const socketAddress = getSocketAddress(networkId, protocol, port);
    const socket = new ReconnectingWebSocket(`${socketAddress}/ws/accounts/${self.accountNumber}`);
    socket.onmessage = (event) => rootRouter(dispatch, event, networkId);
    socket.onopen = () => {
      dispatch(setSocketStatus({networkId, socketStatus: SocketStatus.connected}));
      const payload = {
        method: 'authenticate',
        token: getAuthToken(self),
      };
      socket.send(JSON.stringify(payload));
    };
    return () => {
      socket.close();
    };
  }, [dispatch, networkId, port, protocol, self]);

  return null;
};

export default WebSocket;
