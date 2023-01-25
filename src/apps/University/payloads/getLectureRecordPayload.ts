import {UniversityRegistration} from 'apps/University/registration';
import {GetLectureRecordParams, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const getLectureRecordPayload = (params: GetLectureRecordParams): AppPayload => {
  return {
    fn: UniversityFn.getLectureRecord,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default getLectureRecordPayload;
