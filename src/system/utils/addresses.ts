import store from 'system/store';
import {NetworkProtocol} from 'system/types';

export const getAddress = (networkId: string): string => {
  const {
    system: {networks},
  } = store.getState();
  const network = networks[networkId];
  const {port, protocol} = network;
  return getFormattedAddress(networkId, protocol, port);
};

const getFormattedAddress = (networkId: string, protocol: string, port?: number): string => {
  const base = `${protocol}://${networkId}`;
  return port?.toString() ? `${base}:${port}` : base;
};

export const getSocketAddress = (networkId: string, protocol: NetworkProtocol, port?: number): string => {
  const socketProtocol = protocol === NetworkProtocol.https ? 'wss' : 'ws';
  return getFormattedAddress(networkId, socketProtocol, port);
};
