import {LearnPage, Tab, TeachPage} from 'apps/University/types';
import {RootState} from 'system/types';

export const getActiveLearnPage = (state: RootState): LearnPage => state.university.manager.activeLearnPage;
export const getActiveTab = (state: RootState): Tab => state.university.manager.activeTab;
export const getActiveTeachPage = (state: RootState): TeachPage => state.university.manager.activeTeachPage;
