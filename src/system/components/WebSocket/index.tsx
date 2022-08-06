import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {getSelf} from 'system/selectors/state';
import {AppDispatch, NetworkProtocol, SFC} from 'system/types';
import {getSocketAddress} from 'system/utils/addresses';

interface WebSocketProps {
  domain: string;
  port?: number;
  protocol: NetworkProtocol;
}

const WebSocket: SFC<WebSocketProps> = ({domain, port, protocol}) => {
  const dispatch = useDispatch<AppDispatch>();
  const self = useSelector(getSelf);

  useEffect(() => {
    const socketAddress = getSocketAddress(domain, protocol, port);
    const socket = new ReconnectingWebSocket(`${socketAddress}/ws/accounts/${self.accountNumber}`);
    // When the custom auth message is sent onOpen, the online indicator can be yellow (indicating waiting on BE)
    socket.onopen = (event) => {
      console.log(event);
      // update online indicator to yellow
      // send custom auth WS message
    };
    socket.onmessage = (event) => console.log(dispatch, event);
    return () => {
      socket.close();
    };
  }, [dispatch, domain, port, protocol, self.accountNumber]);

  return null;
};

export default WebSocket;
