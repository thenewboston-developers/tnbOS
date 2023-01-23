import {courseIdListValidator} from 'apps/University/validators/common';
import {validateCoursesIds} from 'apps/University/validators/getCourseListValidators';
import store from 'system/store';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getCourseListListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params: courseIds} = payload;
      const {
        system: {self},
        university: {courses},
      } = store.getState();

      await courseIdListValidator.validate(courseIds);

      try {
        validateCoursesIds(courseIds, courses, self);

        // send back these courses
        console.log(courseIds);
      } catch (error) {
        // if request is invalid because user requested course ID of course that does not exist, teacher will respond by
        // sending back an update course record instead of the course data
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getCourseListListener;
