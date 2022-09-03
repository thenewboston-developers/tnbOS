import {PeerRequestManager, PeerRequestMethod, Self} from 'system/types';

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

export const validateIsSelfAccountNumber = (accountNumber: string, self: Self) => {
  if (accountNumber !== self.accountNumber) throw new Error('Invalid account number');
};
