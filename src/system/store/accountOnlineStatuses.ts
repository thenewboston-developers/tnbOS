import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {SYSTEM_ACCOUNT_ONLINE_STATUSES} from 'system/store/constants';
import {AccountOnlineStatuses} from 'system/types';

export const initialState: AccountOnlineStatuses = {};

const accountOnlineStatuses = createSlice({
  initialState,
  name: SYSTEM_ACCOUNT_ONLINE_STATUSES,
  reducers: {
    setAccountOnlineStatuses: (_: AccountOnlineStatuses, {payload}: PayloadAction<AccountOnlineStatuses>) => {
      return payload;
    },
  },
});

export const {setAccountOnlineStatuses} = accountOnlineStatuses.actions;
export default accountOnlineStatuses.reducer;
