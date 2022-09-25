import {ChatRegistration} from 'apps/Chat/registration';
import {ChatFn, SetDeliveryStatusParams} from 'apps/Chat/types';
import {AppPayload} from 'system/types';

const setDeliveryStatusPayload = (params: SetDeliveryStatusParams): AppPayload => {
  return {
    fn: ChatFn.setDeliveryStatus,
    params,
    pid: ChatRegistration.appId,
  };
};

export default setDeliveryStatusPayload;
