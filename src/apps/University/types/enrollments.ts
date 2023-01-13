import {Dict} from 'system/types';

export interface Enrollment {
  courseId: string;
  enrollmentDate: string;
}

export type Enrollments = Dict<Enrollment>;
