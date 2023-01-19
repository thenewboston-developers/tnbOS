import {Page} from 'apps/University/types/pages';

export interface Manager {
  activeLearnCourseId: string | null;
  activeLearnLectureId: string | null;
  activePage: Page;
  activeTeachCourseId: string | null;
  activeTeachLectureId: string | null;
}
