import {createSlice} from '@reduxjs/toolkit';

import {SYSTEM_SELF} from 'system/store/constants';
import {SelfSlice} from 'system/types';

export const initialState: SelfSlice = {
  accountNumber: '',
  displayImage: '',
  displayName: 'Bob',
  signingKey: '',
};

const self = createSlice({
  initialState,
  name: SYSTEM_SELF,
  reducers: {},
});

export const {} = self.actions;
export default self.reducer;
