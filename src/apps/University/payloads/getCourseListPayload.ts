import {UniversityRegistration} from 'apps/University/registration';
import {UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const getCourseListPayload = (params: string[]): AppPayload => {
  return {
    fn: UniversityFn.getCourseList,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default getCourseListPayload;
