import noop from 'lodash/noop';

import updateAccountListener from 'system/listeners/updateAccountListener';
import {AppDispatch, SocketDataStandard, SocketDataStandardType} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const socketDataStandardRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  const {type} = socketData;

  const handlers = {
    [SocketDataStandardType.createBlock]: noop,
    [SocketDataStandardType.trackOnlineStatus]: noop,
    [SocketDataStandardType.updateAccount]: updateAccountListener,
  };

  const handler = handlers[type];

  if (!handler) {
    displayErrorToast(`${type} is an unknown type`);
    return;
  }

  handler(dispatch, networkId, socketData);
};

export default socketDataStandardRouter;
