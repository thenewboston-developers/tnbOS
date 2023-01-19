import {setCourse} from 'apps/University/store/courses';
import {setLectureList} from 'apps/University/store/lectures';
import {
  setCourseWithLecturesValidator,
  validateInstructor,
  validateLectureCourseIds,
  validateLecturePositions,
} from 'apps/University/validators/setCourseWithLecturesValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setCourseWithLecturesListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setCourseWithLecturesValidator.validate(params);
      const {course, lectures} = params;

      validateInstructor(blockSender, course);
      validateLectureCourseIds(course, lectures);
      validateLecturePositions(lectures);

      dispatch(setCourse(course));
      dispatch(setLectureList(lectures));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseWithLecturesListener;
