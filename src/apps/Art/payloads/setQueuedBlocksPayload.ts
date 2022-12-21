import {ArtRegistration} from 'apps/Art/registration';
import {ArtFn, SetQueuedBlocksParams} from 'apps/Art/types';
import {AppPayload} from 'system/types';

const setQueuedBlocksPayload = (params: SetQueuedBlocksParams): AppPayload => {
  return {
    fn: ArtFn.setQueuedBlocks,
    params,
    pid: ArtRegistration.appId,
  };
};

export default setQueuedBlocksPayload;
