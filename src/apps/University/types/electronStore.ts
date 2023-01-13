import {UNIVERSITY_COURSES, UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {Courses, Manager} from 'apps/University/types';

export interface UniversityElectronStore {
  [UNIVERSITY_COURSES]: Courses;
  [UNIVERSITY_MANAGER]: Manager;
}
