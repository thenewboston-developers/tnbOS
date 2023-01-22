import {
  UNIVERSITY_COURSE_RECORDS,
  UNIVERSITY_COURSES,
  UNIVERSITY_ENROLLMENTS,
  UNIVERSITY_LECTURES,
  UNIVERSITY_MANAGER,
} from 'apps/University/store/constants';
import {initialState as courseRecordsInitialState, setCourseRecords} from 'apps/University/store/courseRecords';
import {initialState as coursesInitialState, setCourses} from 'apps/University/store/courses';
import {initialState as enrollmentsInitialState, setEnrollments} from 'apps/University/store/enrollments';
import {initialState as lecturesInitialState, setLectures} from 'apps/University/store/lectures';
import {initialState as managerInitialState, setManager} from 'apps/University/store/manager';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const courses = store?.[UNIVERSITY_COURSES] || coursesInitialState;
  const courseRecords = store?.[UNIVERSITY_COURSE_RECORDS] || courseRecordsInitialState;
  const enrollments = store?.[UNIVERSITY_ENROLLMENTS] || enrollmentsInitialState;
  const lectures = store?.[UNIVERSITY_LECTURES] || lecturesInitialState;
  const manager = store?.[UNIVERSITY_MANAGER] || managerInitialState;
  dispatch(setCourses(courses));
  dispatch(setCourseRecords(courseRecords));
  dispatch(setEnrollments(enrollments));
  dispatch(setLectures(lectures));
  dispatch(setManager(manager));
};

export default loadAppData;
