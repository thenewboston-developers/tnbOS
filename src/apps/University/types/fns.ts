import {Course} from 'apps/University/types/courses';
import {Lecture} from 'apps/University/types/lectures';

export interface SetCourseRecordReceiptParams {
  recordModifiedDate: string;
}

export interface SetCourseWithLecturesParams {
  course: Course;
  lectures: Lecture[];
}

export enum UniversityFn {
  setCourseRecord = 'setCourseRecord',
  setCourseRecordReceipt = 'setCourseRecordReceipt',
  setCourseWithLectures = 'setCourseWithLectures',
}
