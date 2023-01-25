import {Dict} from 'system/types';

export interface CourseRecord {
  courseModifiedDates: Dict<string>;
  recordModifiedDate: string;
}

export type CourseRecords = Dict<CourseRecord>;
