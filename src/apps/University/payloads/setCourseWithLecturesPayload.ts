import {UniversityRegistration} from 'apps/University/registration';
import {SetCourseWithLecturesParams, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setCourseWithLecturesPayload = (params: SetCourseWithLecturesParams): AppPayload => {
  return {
    fn: UniversityFn.setCourseWithLectures,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setCourseWithLecturesPayload;
