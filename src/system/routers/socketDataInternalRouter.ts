import noop from 'lodash/noop';

import authenticateListener from 'system/listeners/authenticateListener';
import store from 'system/store';
import {deleteNetworkCorrelationId} from 'system/store/networkCorrelationIds';
import {AppDispatch, SocketDataInternal, SocketDataInternalMethod} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const socketDataInternalRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataInternal) => {
  const {
    system: {networkCorrelationIds},
  } = store.getState();

  const networkDict = networkCorrelationIds[networkId];

  if (!networkDict) {
    displayErrorToast(`No network correlation IDs for ${networkId}`);
    return;
  }

  const {correlation_id} = socketData;
  const method = networkDict[correlation_id];

  if (!method) {
    displayErrorToast(`No method for ${networkId}.${correlation_id}`);
    return;
  }

  const listeners = {
    [SocketDataInternalMethod.authenticate]: authenticateListener,
    [SocketDataInternalMethod.get_peers]: noop,
    [SocketDataInternalMethod.set_peers]: noop,
  };

  dispatch(
    deleteNetworkCorrelationId({
      correlation_id,
      networkId,
    }),
  );

  const listener = listeners[method];
  listener(dispatch, networkId, socketData);
};

export default socketDataInternalRouter;
