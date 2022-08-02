import {createSlice} from '@reduxjs/toolkit';

import {SYSTEM_INTERNAL} from 'system/store/constants';
import {Internal} from 'system/types';

const initialState: Internal = {
  storeLoaded: false,
};

const internal = createSlice({
  initialState,
  name: SYSTEM_INTERNAL,
  reducers: {
    setStoreLoadedTrue: (state) => {
      state.storeLoaded = true;
    },
  },
});

export const {setStoreLoadedTrue} = internal.actions;
export default internal.reducer;
