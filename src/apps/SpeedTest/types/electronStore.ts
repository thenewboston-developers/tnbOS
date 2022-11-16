import {SPEED_TEST_MANAGER, SPEED_TEST_RUNS} from 'apps/SpeedTest/store/constants';
import {Manager, Runs} from 'apps/SpeedTest/types';

export interface SpeedTestElectronStore {
  [SPEED_TEST_MANAGER]: Manager;
  [SPEED_TEST_RUNS]: Runs;
}
