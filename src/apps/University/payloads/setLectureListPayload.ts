import {UniversityRegistration} from 'apps/University/registration';
import {Lecture, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const setLectureListPayload = (params: Lecture[]): AppPayload => {
  return {
    fn: UniversityFn.setLectureList,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default setLectureListPayload;
