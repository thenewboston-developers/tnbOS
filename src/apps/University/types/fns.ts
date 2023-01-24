import {Course} from 'apps/University/types/courses';
import {Lecture} from 'apps/University/types/lectures';

export interface GetLectureRecordParams {
  courseId: string;
}

export interface SetCourseRecordReceiptParams {
  recordModifiedDate: string;
}

export interface SetCourseWithLecturesParams {
  course: Course;
  lectures: Lecture[];
}

export enum UniversityFn {
  getCourseList = 'getCourseList',
  getLectureRecord = 'getLectureRecord',
  setCourseList = 'setCourseList',
  setCourseRecord = 'setCourseRecord',
  setCourseRecordReceipt = 'setCourseRecordReceipt',
  setCourseWithLectures = 'setCourseWithLectures',
}
