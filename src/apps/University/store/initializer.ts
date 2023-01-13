import {UNIVERSITY_COURSES, UNIVERSITY_ENROLLMENTS, UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {initialState as coursesInitialState, setCourses} from 'apps/University/store/courses';
import {initialState as enrollmentsInitialState, setEnrollments} from 'apps/University/store/enrollments';
import {initialState as managerInitialState, setManager} from 'apps/University/store/manager';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadAppData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const courses = store?.[UNIVERSITY_COURSES] || coursesInitialState;
  const enrollments = store?.[UNIVERSITY_ENROLLMENTS] || enrollmentsInitialState;
  const manager = store?.[UNIVERSITY_MANAGER] || managerInitialState;
  dispatch(setCourses(courses));
  dispatch(setEnrollments(enrollments));
  dispatch(setManager(manager));
};

export default loadAppData;
