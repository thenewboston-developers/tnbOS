import {PublicationStatus} from 'apps/University/types/publicationStatus';
import {Dict} from 'system/types';

export interface Lecture {
  courseId: string;
  createdDate: string;
  description: string;
  lectureId: string;
  name: string;
  position: number;
  publicationStatus: PublicationStatus;
  thumbnailUrl: string;
  youtubeId: string;
}

export type Lectures = Dict<Lecture>;
