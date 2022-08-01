import {createSlice} from '@reduxjs/toolkit';

export const initialState: any = {
  account_number: '',
  signing_key: '',
};

const self = createSlice({
  initialState,
  name: 'sample',
  reducers: {},
});

export const {} = self.actions;
export default self.reducer;
