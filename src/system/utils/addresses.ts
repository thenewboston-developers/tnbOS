import {NetworkProtocol} from 'system/types';

const getFormattedAddress = (domain: string, protocol: string, port?: number): string => {
  const base = `${protocol}://${domain}`;
  return port ? `${base}:${port}` : base;
};

export const getSocketAddress = (networkId: string, protocol: NetworkProtocol, port?: number): string => {
  const socketProtocol = protocol === NetworkProtocol.https ? 'wss' : 'ws';
  return getFormattedAddress(networkId, socketProtocol, port);
};
