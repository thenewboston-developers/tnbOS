import {LectureRecord} from 'apps/University/types/lectureRecords';

export interface GetLectureRecordParams {
  courseId: string;
}

export interface SetCourseRecordReceiptParams {
  recordModifiedDate: string;
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
  setLectureList = 'setLectureList',
  setLectureRecord = 'setLectureRecord',
}
