import {PublicationStatus} from 'apps/University/types/publicationStatus';
import {Dict} from 'system/types';

export interface Course {
  courseId: string;
  createdDate: string;
  description: string;
  instructor: string;
  modifiedDate: string;
  name: string;
  publicationStatus: PublicationStatus;
  thumbnailUrl: string;
}

export type Courses = Dict<Course>;
