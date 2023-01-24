import {UniversityRegistration} from 'apps/University/registration';
import {SetLectureRecordParams, UniversityFn} from 'apps/University/types';
import {AppPayload} from 'system/types';
import {sortAttributesAlphabetically} from 'system/utils/attributes';

const setLectureRecordPayload = (params: SetLectureRecordParams): AppPayload => {
  const {courseId, lectureRecord} = params;

  return {
    fn: UniversityFn.setLectureRecord,
    params: {
      courseId: courseId,
      lectureRecord: {
        lectureModifiedDates: sortAttributesAlphabetically(lectureRecord.lectureModifiedDates),
        recordModifiedDate: lectureRecord.recordModifiedDate,
      },
    },
    pid: UniversityRegistration.appId,
  };
};

export default setLectureRecordPayload;
