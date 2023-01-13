import {UNIVERSITY_COURSES, UNIVERSITY_ENROLLMENTS, UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {Courses, Enrollments, Manager} from 'apps/University/types';

export interface UniversityElectronStore {
  [UNIVERSITY_COURSES]: Courses;
  [UNIVERSITY_ENROLLMENTS]: Enrollments;
  [UNIVERSITY_MANAGER]: Manager;
}
