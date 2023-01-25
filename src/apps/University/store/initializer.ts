import {
  UNIVERSITY_COURSE_RECORDS,
  UNIVERSITY_COURSES,
  UNIVERSITY_ENROLLMENTS,
  UNIVERSITY_LECTURE_RECORDS,
  UNIVERSITY_LECTURES,
  UNIVERSITY_MANAGER,
} from 'apps/University/store/constants';
import {initialState as courseRecordsInitialState, setCourseRecords} from 'apps/University/store/courseRecords';
import {initialState as coursesInitialState, setCourses, unsetCourses} from 'apps/University/store/courses';
import {
  initialState as enrollmentsInitialState,
  setEnrollments,
  unsetEnrollmentsFromCourseIds,
} from 'apps/University/store/enrollments';
import {initialState as lectureRecordsInitialState, setLectureRecords} from 'apps/University/store/lectureRecords';
import {
  initialState as lecturesInitialState,
  setLectures,
  unsetLecturesFromCourseIds,
} from 'apps/University/store/lectures';
import {initialState as managerInitialState, setManager} from 'apps/University/store/manager';
import {Course} from 'apps/University/types';
import {LocalElectronStore} from 'shared/types';
import store from 'system/store';
import {AppDispatch} from 'system/types';

const clean = (dispatch: AppDispatch) => {
  const {
    system: {self},
    university: {courses, enrollments},
  } = store.getState();

  const courseList: Course[] = Object.values(courses);

  const courseIds = courseList
    .filter(({courseId, instructor}) => instructor !== self.accountNumber && !enrollments[courseId])
    .map(({courseId}) => courseId);

  dispatch(unsetEnrollmentsFromCourseIds(courseIds));
  dispatch(unsetLecturesFromCourseIds(courseIds));
  dispatch(unsetCourses(courseIds));
};

const loadAppData = (dispatch: AppDispatch, electronStore: LocalElectronStore): void => {
  const courses = electronStore?.[UNIVERSITY_COURSES] || coursesInitialState;
  const courseRecords = electronStore?.[UNIVERSITY_COURSE_RECORDS] || courseRecordsInitialState;
  const enrollments = electronStore?.[UNIVERSITY_ENROLLMENTS] || enrollmentsInitialState;
  const lectures = electronStore?.[UNIVERSITY_LECTURES] || lecturesInitialState;
  const lectureRecords = electronStore?.[UNIVERSITY_LECTURE_RECORDS] || lectureRecordsInitialState;
  const manager = electronStore?.[UNIVERSITY_MANAGER] || managerInitialState;
  dispatch(setCourses(courses));
  dispatch(setCourseRecords(courseRecords));
  dispatch(setEnrollments(enrollments));
  dispatch(setLectures(lectures));
  dispatch(setLectureRecords(lectureRecords));
  dispatch(setManager(manager));

  clean(dispatch);
};

export default loadAppData;
