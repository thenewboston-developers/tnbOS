import noop from 'lodash/noop';

import authListener from 'system/listeners/authListener';
import updateAccountListener from 'system/listeners/updateAccountListener';
import {AppDispatch, AuthSocketData, SocketData, StandardSocketData, StandardSocketDataType} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const handleAuthSocketData = (dispatch: AppDispatch, networkId: string, socketData: AuthSocketData) => {
  authListener(dispatch, networkId, socketData);
};

const handleStandardSocketData = (dispatch: AppDispatch, networkId: string, socketData: StandardSocketData) => {
  const {message, type} = socketData;

  const handlers = {
    [StandardSocketDataType.createBlock]: noop,
    [StandardSocketDataType.updateAccount]: updateAccountListener,
  };

  const handler = handlers[type];

  if (handler) {
    handler(dispatch, message, networkId);
  } else {
    displayErrorToast(`${type} is an unknown type`);
  }
};

const rootRouter = (dispatch: AppDispatch, event: MessageEvent, networkId: string) => {
  const socketData: SocketData = JSON.parse(event.data);

  if (socketData.hasOwnProperty('result')) {
    handleAuthSocketData(dispatch, networkId, socketData as AuthSocketData);
  } else {
    handleStandardSocketData(dispatch, networkId, socketData as StandardSocketData);
  }
};

export default rootRouter;
