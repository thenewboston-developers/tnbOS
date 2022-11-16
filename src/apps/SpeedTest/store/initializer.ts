import {SPEED_TEST_MANAGER, SPEED_TEST_RUNS} from 'apps/SpeedTest/store/constants';
import {initialState as managerInitialState, setManager} from 'apps/SpeedTest/store/manager';
import {initialState as runsInitialState, setRuns} from 'apps/SpeedTest/store/runs';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadSpeedTestStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const manager = store?.[SPEED_TEST_MANAGER] || managerInitialState;
  const runs = store?.[SPEED_TEST_RUNS] || runsInitialState;
  dispatch(setManager(manager));
  dispatch(setRuns(runs));
};

export default loadSpeedTestStoreData;
