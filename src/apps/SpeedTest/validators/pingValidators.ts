import {PingParams} from 'apps/SpeedTest/types';
import yup from 'system/utils/yup';

export const pingValidator: yup.SchemaOf<PingParams> = yup
  .object({
    runId: yup.string().required().uuid(),
  })
  .noUnknown();
