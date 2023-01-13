import {Tab} from 'apps/University/types';
import {RootState} from 'system/types';

export const getActiveTab = (state: RootState): Tab => state.university.manager.activeTab;
