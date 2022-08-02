import {createSlice} from '@reduxjs/toolkit';

import {SYSTEM_SELF} from 'system/store/constants';
import {SelfSlice} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: SelfSlice = {
  accountNumber: '',
  displayImage: '',
  displayName: 'Bob',
  signingKey: '',
};

const self = createSlice({
  initialState,
  name: SYSTEM_SELF,
  reducers: {
    setSelfSlice: setLocalAndStateReducer<SelfSlice>(SYSTEM_SELF),
  },
});

export const {setSelfSlice} = self.actions;
export default self.reducer;
