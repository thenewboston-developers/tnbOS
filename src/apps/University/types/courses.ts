import {Dict} from 'system/types';

export interface Course {
  courseId: string;
  description: string;
  instructor: string;
  name: string;
  thumbnailUrl: string;
}

export type Courses = Dict<Course>;
