import {
  UNIVERSITY_COURSE_RECORDS,
  UNIVERSITY_COURSES,
  UNIVERSITY_ENROLLMENTS,
  UNIVERSITY_LECTURE_RECORDS,
  UNIVERSITY_LECTURES,
  UNIVERSITY_MANAGER,
} from 'apps/University/store/constants';
import {CourseRecords, Courses, Enrollments, LectureRecords, Lectures, Manager} from 'apps/University/types';

export interface UniversityElectronStore {
  [UNIVERSITY_COURSES]: Courses;
  [UNIVERSITY_COURSE_RECORDS]: CourseRecords;
  [UNIVERSITY_ENROLLMENTS]: Enrollments;
  [UNIVERSITY_LECTURES]: Lectures;
  [UNIVERSITY_LECTURE_RECORDS]: LectureRecords;
  [UNIVERSITY_MANAGER]: Manager;
}
