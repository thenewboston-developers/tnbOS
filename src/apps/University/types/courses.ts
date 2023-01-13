import {PublicationStatus} from 'apps/University/types/publicationStatus';
import {Dict} from 'system/types';

export interface Course {
  courseId: string;
  description: string;
  instructor: string;
  name: string;
  publicationStatus: PublicationStatus;
  thumbnailUrl: string;
}

export type Courses = Dict<Course>;
