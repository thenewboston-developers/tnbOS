import {setLectureRecordBlock} from 'apps/University/blocks';
import {getLectureRecordValidator, validateCourse} from 'apps/University/validators/getLectureRecordValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getLectureRecordListener = (block: Block, _: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {self},
        university: {courses, lectureRecords},
      } = store.getState();

      await getLectureRecordValidator.validate(params);
      const {courseId} = params;

      validateCourse(courseId, courses, self);

      const lectureRecord = lectureRecords[courseId];

      if (lectureRecord) {
        await setLectureRecordBlock({
          networkId,
          params: {
            courseId,
            lectureRecord,
          },
          recipient: blockSender,
        });
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getLectureRecordListener;
