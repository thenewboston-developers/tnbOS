import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {SPEED_TEST_RUNS} from 'apps/SpeedTest/store/constants';
import {Run, Runs} from 'apps/SpeedTest/types';
import {IpcChannel} from 'shared/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Runs = {};

const runs = createSlice({
  initialState,
  name: SPEED_TEST_RUNS,
  reducers: {
    setRun: (state: Runs, {payload}: PayloadAction<Run>) => {
      const {runId} = payload;
      const run = state[runId];
      state[runId] = run ? {...run, ...payload} : payload;
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SPEED_TEST_RUNS, state: current(state)});
    },
    setRuns: setLocalAndStateReducer<Runs>(SPEED_TEST_RUNS),
  },
});

export const {setRun, setRuns} = runs.actions;
export default runs.reducer;
