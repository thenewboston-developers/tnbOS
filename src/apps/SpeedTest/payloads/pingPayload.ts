import {SpeedTestRegistration} from 'apps/SpeedTest/registration';
import {PingParams, SpeedTestFn} from 'apps/SpeedTest/types';
import {AppPayload} from 'system/types';

const pingPayload = (params: PingParams): AppPayload => {
  return {
    fn: SpeedTestFn.ping,
    params,
    pid: SpeedTestRegistration.appId,
  };
};

export default pingPayload;
