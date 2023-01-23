import {UniversityRegistration} from 'apps/University/registration';
import {CourseRecord, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setCourseRecordPayload = (params: CourseRecord): AppPayload => {
  return {
    fn: UniversityFn.setCourseRecord,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setCourseRecordPayload;
