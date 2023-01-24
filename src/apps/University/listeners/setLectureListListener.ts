import {setLectureList} from 'apps/University/store/lectures';
import {Lecture} from 'apps/University/types';
import {
  setLectureListValidator,
  validateLectureIdsAccountNumber,
} from 'apps/University/validators/setLectureListValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setLectureListListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setLectureListValidator.validate(params);
      const lectureList: Lecture[] = params;

      validateLectureIdsAccountNumber(blockSender, lectureList);

      dispatch(setLectureList(lectureList));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setLectureListListener;
