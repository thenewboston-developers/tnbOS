import {UniversityRegistration} from 'apps/University/registration';
import {SetCourseRecordReceiptParams, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setCourseRecordReceiptPayload = (params: SetCourseRecordReceiptParams): AppPayload => {
  return {
    fn: UniversityFn.setCourseRecordReceipt,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setCourseRecordReceiptPayload;
