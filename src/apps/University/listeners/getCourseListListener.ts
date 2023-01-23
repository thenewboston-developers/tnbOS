import {courseIdListValidator} from 'apps/University/validators/common';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getCourseListListener = (block: Block, dispatch: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await courseIdListValidator.validate(params);

      // if request is invalid because user requested course ID of course that does not exist, teacher will respond by
      // sending back an update course record instead of the course data
      console.log(params);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getCourseListListener;
