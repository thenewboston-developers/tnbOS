import {PeerRequestManager, PeerRequestMethod} from 'system/types';
import yup from 'system/utils/forms/yup';

export const setPeersValidator = yup.object({
  correlation_id: yup.string().required(),
  return_value: yup
    .mixed()
    .nullable()
    .test('is-null', 'Return value is not null', (return_value: any) => return_value === null),
});

export const validateLastRequestId = (
  correlationId: string,
  networkId: string,
  peerRequestManager: PeerRequestManager,
) => {
  const networkPeerRequests = peerRequestManager[networkId];

  if (!networkPeerRequests) {
    throw new Error(`No peer request manager for ${networkId}`);
  }

  const {lastRequestId} = networkPeerRequests[PeerRequestMethod.setPeers];

  if (correlationId !== lastRequestId) {
    throw new Error('Correlation ID does not match the last request ID');
  }
};
