import {setCourseList} from 'apps/University/store/courses';
import {Course} from 'apps/University/types';
import {setCourseListValidator, validateInstructors} from 'apps/University/validators/setCourseListValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setCourseListListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setCourseListValidator.validate(params);
      const courseList: Course[] = params;

      validateInstructors(blockSender, courseList);

      dispatch(setCourseList(courseList));
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCourseListListener;
