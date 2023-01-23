import {setCourseListBlock, setCourseRecordBlock} from 'apps/University/blocks';
import {courseIdListValidator} from 'apps/University/validators/common';
import {validateCoursesIds} from 'apps/University/validators/getCourseListValidators';
import store from 'system/store';
import {Block} from 'shared/types';
import {AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const getCourseListListener = (block: Block, _: AppDispatch, networkId: string) => {
  (async () => {
    try {
      const {payload, sender: blockSender} = block;
      const {params} = payload;
      const {
        system: {self},
        university: {courseRecords, courses},
      } = store.getState();

      await courseIdListValidator.validate(params);
      const courseIds: string[] = params;

      try {
        validateCoursesIds(courseIds, courses, self);
        const _courses = courseIds.map((courseId) => courses[courseId]);
        await setCourseListBlock({
          networkId,
          params: _courses,
          recipient: blockSender,
        });
      } catch (error) {
        const courseRecord = courseRecords[self.accountNumber];
        if (courseRecord) {
          await setCourseRecordBlock({
            networkId: networkId,
            params: courseRecord,
            recipient: blockSender,
          });
        }
      }
    } catch (error) {
      console.error(error);
      displayErrorToast('Invalid block received');
    }
  })();
};

export default getCourseListListener;
