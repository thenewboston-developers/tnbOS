import {PeerRequestManager, PeerRequestMethod} from 'system/types';

export const validateCorrelationIdMatchesLastRequestId = (
  correlationId: string,
  networkId: string,
  peerRequestManager: PeerRequestManager,
  peerRequestMethod: PeerRequestMethod,
) => {
  const networkPeerRequests = peerRequestManager[networkId];

  if (!networkPeerRequests) {
    throw new Error(`No peer request manager for ${networkId}`);
  }

  const {lastRequestId} = networkPeerRequests[peerRequestMethod];

  if (correlationId !== lastRequestId) {
    throw new Error('Correlation ID does not match the last request ID');
  }
};
