import {UniversityRegistration} from 'apps/University/registration';
import {UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';

const getLectureListPayload = (params: string[]): AppPayload => {
  return {
    fn: UniversityFn.getLectureList,
    params,
    pid: UniversityRegistration.appId,
  };
};

export default getLectureListPayload;
