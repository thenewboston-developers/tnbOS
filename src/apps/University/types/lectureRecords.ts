import {Dict} from 'system/types';

export interface LectureRecord {
  lectureModifiedDates: Dict<string>;
  recordModifiedDate: string;
}

export type LectureRecords = Dict<LectureRecord>;
