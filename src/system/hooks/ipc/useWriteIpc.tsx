import {useCallback} from 'react';

import {GenericVoidFunction, IpcChannel} from 'shared/types';
import {getFailChannel, getSuccessChannel} from 'shared/utils/ipc';
import {useIpcEffect} from 'system/hooks/ipc/utils';

function useWriteIpc<P = undefined>({
  channel,
  failCallback,
  payload,
  successCallback,
}: {
  channel: IpcChannel;
  failCallback: GenericVoidFunction;
  payload?: P;
  successCallback: GenericVoidFunction;
}) {
  useIpcEffect(getSuccessChannel(channel), successCallback);
  useIpcEffect(getFailChannel(channel), failCallback);

  return useCallback(() => window.electron.ipc.send(channel, payload), [channel, payload]);
}

export default useWriteIpc;
