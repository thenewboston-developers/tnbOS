import {UniversityRegistration} from 'apps/University/registration';
import {Course, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setCoursesPayload = (params: Course[]): AppPayload => {
  return {
    fn: UniversityFn.setCourses,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setCoursesPayload;
