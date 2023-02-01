import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_NOTIFICATION_COUNTS} from 'system/store/constants';
import {NotificationCounts} from 'system/types';

export const initialState: NotificationCounts = {};

const notificationCounts = createSlice({
  initialState,
  name: SYSTEM_NOTIFICATION_COUNTS,
  reducers: {
    setNotificationCount: (
      state: NotificationCounts,
      {payload}: PayloadAction<{appId: string; notificationCount: number}>,
    ) => {
      const {appId, notificationCount} = payload;
      state[appId] = notificationCount;
    },
  },
});

export const {setNotificationCount} = notificationCounts.actions;
export default notificationCounts.reducer;
