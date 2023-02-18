import {CourseRecordRecipients, CourseRecords, Courses, Enrollments, Lectures, Page} from 'apps/University/types';
import {RootState} from 'system/types';

export const getActiveLearnCourseId = (state: RootState): string | null => state.university.manager.activeLearnCourseId;
export const getActiveLearnLectureId = (state: RootState): string | null =>
  state.university.manager.activeLearnLectureId;
export const getActivePage = (state: RootState): Page => state.university.manager.activePage;
export const getActiveTeachCourseId = (state: RootState): string | null => state.university.manager.activeTeachCourseId;
export const getActiveTeachLectureId = (state: RootState): string | null =>
  state.university.manager.activeTeachLectureId;
export const getCourseRecordRecipients = (state: RootState): CourseRecordRecipients =>
  state.university.courseRecordRecipients;
export const getCourseRecords = (state: RootState): CourseRecords => state.university.courseRecords;
export const getCourses = (state: RootState): Courses => state.university.courses;
export const getEnrollments = (state: RootState): Enrollments => state.university.enrollments;
export const getLectures = (state: RootState): Lectures => state.university.lectures;
