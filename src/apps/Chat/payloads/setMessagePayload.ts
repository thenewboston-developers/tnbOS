import {ChatRegistration} from 'apps/Chat/registration';
import {ChatFn, SetMessageParams} from 'apps/Chat/types';
import {AppPayload} from 'system/types';

const setMessagePayload = (params: SetMessageParams): AppPayload => {
  return {
    fn: ChatFn.setMessage,
    params,
    pid: ChatRegistration.appId,
  };
};

export default setMessagePayload;
