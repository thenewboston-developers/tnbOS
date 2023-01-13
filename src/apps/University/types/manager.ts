import {LearnPage, TeachPage} from 'apps/University/types/pages';
import {Tab} from 'apps/University/types/tabs';

export interface Manager {
  activeLearnPage: LearnPage;
  activeTab: Tab;
  activeTeachPage: TeachPage;
}
