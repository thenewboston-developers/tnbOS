import {LearnPage, TeachPage} from 'apps/University/types/pages';
import {Tab} from 'apps/University/types/tabs';

export interface Manager {
  activeLearnCourseId: string | null;
  activeLearnLectureId: string | null;
  activeLearnPage: LearnPage;
  activeTab: Tab;
  activeTeachCourseId: string | null;
  activeTeachLectureId: string | null;
  activeTeachPage: TeachPage;
}
