import {UniversityRegistration} from 'apps/University/registration';
import {CourseRecord, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';
import {sortAttributesAlphabetically} from 'system/utils/attributes';

const setCourseRecordPayload = (params: CourseRecord): AppPayload => {
  return {
    fn: UniversityFn.setCourseRecord,
    params: {
      courseModifiedDates: sortAttributesAlphabetically(params.courseModifiedDates),
      recordModifiedDate: params.recordModifiedDate,
    },
    pid: UniversityRegistration.appId,
  };
};

export default setCourseRecordPayload;
