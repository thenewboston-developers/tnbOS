import {createSlice, current, PayloadAction} from '@reduxjs/toolkit';

import {IpcChannel} from 'shared/types';
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
    updateSelf: (state: Self, {payload}: PayloadAction<Partial<Self>>) => {
      Object.assign(state, payload);
      window.electron.ipc.send(IpcChannel.setStoreValue, {key: SYSTEM_SELF, state: current(state)});
    },
  },
});

export const {setSelf, updateSelf} = self.actions;
export default self.reducer;
