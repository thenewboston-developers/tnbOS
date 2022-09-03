import trackOnlineStatusListener from 'system/listeners/trackOnlineStatusListener';
import updateAccountListener from 'system/listeners/updateAccountListener';
import blockRouter from 'system/routers/blockRouter';
import {AppDispatch, SocketDataStandard, SocketDataStandardType} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const socketDataStandardRouter = (dispatch: AppDispatch, networkId: string, socketData: SocketDataStandard) => {
  const {type} = socketData;

  const handlers = {
    [SocketDataStandardType.createBlock]: blockRouter,
    [SocketDataStandardType.trackOnlineStatus]: trackOnlineStatusListener,
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
