import {useEffect} from 'react';
import noop from 'lodash/noop';

import {GenericVoidFunction} from 'shared/types';

export const useIpcEffect = (channel: string, callback: GenericVoidFunction = noop) => {
  useEffect(() => {
    window.electron.ipcRenderer.on(channel, callback);

    return () => {
      window.electron.ipcRenderer.removeListener(channel, callback);
    };
  }, [channel, callback]);
};
