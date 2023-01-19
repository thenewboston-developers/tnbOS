import {setCoursesValidator, validateInstructors} from 'apps/University/validators/setCoursesValidators';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const setCoursesListener = (block: Block, dispatch: AppDispatch) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;

      await setCoursesValidator.validate(params);
      validateInstructors(blockSender, params);

      // TODO: Need to set lectures at the same time to prevent lectures in redux without any related course
      console.log(dispatch);
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default setCoursesListener;
