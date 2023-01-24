import {
  getCourseListListener,
  getLectureListListener,
  getLectureRecordListener,
  setCourseListListener,
  setCourseRecordListener,
  setCourseRecordReceiptListener,
  setCourseWithLecturesListener,
  setLectureListListener,
  setLectureRecordListener,
} from 'apps/University/listeners';
import {UniversityFn} from 'apps/University/types';
import {Block} from 'shared/types';
import {AppDataHandlers, AppDispatch} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

const appRouter = (block: Block, dispatch: AppDispatch, networkId: string) => {
  const {
    payload: {fn, pid},
  } = block;

  const fnHandlers: AppDataHandlers = {
    [UniversityFn.getCourseList]: getCourseListListener,
    [UniversityFn.getLectureList]: getLectureListListener,
    [UniversityFn.getLectureRecord]: getLectureRecordListener,
    [UniversityFn.setCourseList]: setCourseListListener,
    [UniversityFn.setCourseRecordReceipt]: setCourseRecordReceiptListener,
    [UniversityFn.setCourseRecord]: setCourseRecordListener,
    [UniversityFn.setCourseWithLectures]: setCourseWithLecturesListener,
    [UniversityFn.setLectureList]: setLectureListListener,
    [UniversityFn.setLectureRecord]: setLectureRecordListener,
  };

  const fnHandler = fnHandlers[fn];

  if (!fnHandler) {
    displayErrorToast(`${pid}.${fn} is an unknown university function`);
    return;
  }

  fnHandler(block, dispatch, networkId);
};

export default appRouter;
