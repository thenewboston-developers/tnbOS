import {ChatRegistration} from 'apps/Chat/registration';
import {ChatFn, SetMessageParams} from 'apps/Chat/types';
import {AppPayload} from 'system/types';

const setMessagePayload = (params: SetMessageParams): AppPayload => {
  return {
    app: ChatRegistration.appId,
    fn: ChatFn.setMessage,
    params,
  };
};

export default setMessagePayload;
