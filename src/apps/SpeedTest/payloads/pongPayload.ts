import {SpeedTestRegistration} from 'apps/SpeedTest/registration';
import {SpeedTestFn, PongParams} from 'apps/SpeedTest/types';
import {AppPayload} from 'system/types';

const pongPayload = (params: PongParams): AppPayload => {
  return {
    fn: SpeedTestFn.pong,
    params,
    pid: SpeedTestRegistration.appId,
  };
};

export default pongPayload;
