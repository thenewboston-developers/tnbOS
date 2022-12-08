import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ART_MANAGER} from 'apps/Art/store/constants';
import {Manager, Page} from 'apps/Art/types';

export const initialState: Manager = {
  activePage: Page.home,
};

const manager = createSlice({
  initialState,
  name: ART_MANAGER,
  reducers: {
    setActivePage: (state: Manager, {payload: page}: PayloadAction<Page>) => {
      state.activePage = page;
    },
  },
});

export const {setActivePage} = manager.actions;
export default manager.reducer;
