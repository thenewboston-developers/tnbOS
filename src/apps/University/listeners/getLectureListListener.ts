import {universityIdListValidator} from 'apps/University/validators/common';
import {validateLectureIds} from 'apps/University/validators/getLectureListValidators';
import {Block} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getLectureListListener = (block: Block, _: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {self},
        university: {courses, lectures},
      } = store.getState();

      await universityIdListValidator.validate(params);
      const lectureIds: string[] = params;

      try {
        validateLectureIds(courses, lectureIds, lectures, self);
        const _lectures = lectureIds.map((lectureId) => lectures[lectureId]);
        console.log(_lectures);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getLectureListListener;
