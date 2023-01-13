import {UNIVERSITY_MANAGER} from 'apps/University/store/constants';
import {Manager} from 'apps/University/types';

export interface UniversityElectronStore {
  [UNIVERSITY_MANAGER]: Manager;
}
