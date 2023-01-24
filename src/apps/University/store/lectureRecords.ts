import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {UNIVERSITY_LECTURE_RECORDS} from 'apps/University/store/constants';
import {LectureRecords} from 'apps/University/types';
import {IpcChannel} from 'shared/types';
import {currentSystemDate} from 'system/utils/dates';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: LectureRecords = {};

const lectureRecords = createSlice({
  initialState,
  name: UNIVERSITY_LECTURE_RECORDS,
  reducers: {
    setLectureRecords: setLocalAndStateReducer<LectureRecords>(UNIVERSITY_LECTURE_RECORDS),
    setSelfLectureRecord: (
      state: LectureRecords,
      {payload}: PayloadAction<{courseId: string; lectureId: string; modifiedDate: string}>,
    ) => {
      const {courseId, lectureId, modifiedDate} = payload;

      if (!state[courseId]) {
        state[courseId] = {
          lectureModifiedDates: {
            [lectureId]: modifiedDate,
          },
          recordModifiedDate: modifiedDate,
        };
      } else {
        state[courseId].lectureModifiedDates[lectureId] = modifiedDate;
        state[courseId].recordModifiedDate = modifiedDate;
      }

      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURE_RECORDS, state: current(state)});
    },
    unsetLectureRecord: (state: LectureRecords, {payload}: PayloadAction<{courseId: string; lectureId: string}>) => {
      const {courseId, lectureId} = payload;
      delete state[courseId].lectureModifiedDates[lectureId];
      state[courseId].recordModifiedDate = currentSystemDate();
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: UNIVERSITY_LECTURE_RECORDS, state: current(state)});
    },
  },
});

export const {setLectureRecords, setSelfLectureRecord, unsetLectureRecord} = lectureRecords.actions;
export default lectureRecords.reducer;
