import {Course} from 'apps/University/types/courses';
import {LectureRecord} from 'apps/University/types/lectureRecords';
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

export interface SetLectureRecordParams {
  courseId: string;
  lectureRecord: LectureRecord;
}

export enum UniversityFn {
  getCourseList = 'getCourseList',
  getLectureList = 'getLectureList',
  getLectureRecord = 'getLectureRecord',
  setCourseList = 'setCourseList',
  setCourseRecord = 'setCourseRecord',
  setCourseRecordReceipt = 'setCourseRecordReceipt',
  setCourseWithLectures = 'setCourseWithLectures',
  setLectureList = 'setLectureList',
  setLectureRecord = 'setLectureRecord',
}
