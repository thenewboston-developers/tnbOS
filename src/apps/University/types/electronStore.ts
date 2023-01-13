import {
  UNIVERSITY_COURSES,
  UNIVERSITY_ENROLLMENTS,
  UNIVERSITY_LECTURES,
  UNIVERSITY_MANAGER,
} from 'apps/University/store/constants';
import {Courses, Enrollments, Lectures, Manager} from 'apps/University/types';

export interface UniversityElectronStore {
  [UNIVERSITY_COURSES]: Courses;
  [UNIVERSITY_ENROLLMENTS]: Enrollments;
  [UNIVERSITY_LECTURES]: Lectures;
  [UNIVERSITY_MANAGER]: Manager;
}
