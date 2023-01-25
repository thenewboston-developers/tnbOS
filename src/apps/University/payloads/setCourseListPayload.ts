import {UniversityRegistration} from 'apps/University/registration';
import {Course, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setCourseListPayload = (params: Course[]): AppPayload => {
  return {
    fn: UniversityFn.setCourseList,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setCourseListPayload;
