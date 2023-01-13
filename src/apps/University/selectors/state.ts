import {Courses, LearnPage, Tab, TeachPage} from 'apps/University/types';
import {RootState} from 'system/types';

export const getActiveLearnCourseId = (state: RootState): string => state.university.manager.activeLearnCourseId;
export const getActiveLearnPage = (state: RootState): LearnPage => state.university.manager.activeLearnPage;
export const getActiveTab = (state: RootState): Tab => state.university.manager.activeTab;
export const getActiveTeachCourseId = (state: RootState): string => state.university.manager.activeTeachCourseId;
export const getActiveTeachPage = (state: RootState): TeachPage => state.university.manager.activeTeachPage;
export const getCourses = (state: RootState): Courses => state.university.courses;
