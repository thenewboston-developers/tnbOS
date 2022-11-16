import {combineReducers} from '@reduxjs/toolkit';

import managerReducer from 'apps/SpeedTest/store/manager';
import runsReducer from 'apps/SpeedTest/store/runs';

const speedTestReducer = combineReducers({
  manager: managerReducer,
  runs: runsReducer,
});

export default speedTestReducer;
