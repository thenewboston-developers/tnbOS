import {setCourse} from 'apps/University/store/courses';
import {setLectureList} from 'apps/University/store/lectures';
import {
  setCourseWithLecturesValidator,
  validateCourseIdAccountNumber,
  validateInstructor,
  validateLectureCourseIdsMatchCourseId,
  validateLectureIdsAccountNumber,
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

      validateCourseIdAccountNumber(course);
      validateInstructor(blockSender, course);
      validateLectureCourseIdsMatchCourseId(course, lectures);
      validateLectureIdsAccountNumber(course, lectures);
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
