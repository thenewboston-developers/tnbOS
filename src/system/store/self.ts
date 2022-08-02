import {createSlice} from '@reduxjs/toolkit';

import {SYSTEM_SELF} from 'system/store/constants';
import {Self} from 'system/types';
import {setLocalAndStateReducer} from 'system/utils/ipc';

export const initialState: Self = {
  accountNumber: '',
  displayImage: '',
  displayName: '',
  signingKey: '',
};

const self = createSlice({
  initialState,
  name: SYSTEM_SELF,
  reducers: {
    setSelf: setLocalAndStateReducer<Self>(SYSTEM_SELF),
  },
});

export const {setSelf} = self.actions;
export default self.reducer;
