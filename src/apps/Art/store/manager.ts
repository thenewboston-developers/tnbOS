import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ART_MANAGER} from 'apps/Art/store/constants';
import {Manager, Page} from 'apps/Art/types';

export const initialState: Manager = {
  activePage: Page.home,
  detailsPageArtworkId: null,
  editPageArtworkId: null,
};

const manager = createSlice({
  initialState,
  name: ART_MANAGER,
  reducers: {
    setActivePage: (state: Manager, {payload: page}: PayloadAction<Page>) => {
      state.activePage = page;
    },
    setDetailsPageArtworkId: (state: Manager, {payload: artworkId}: PayloadAction<string | null>) => {
      state.detailsPageArtworkId = artworkId;
    },
    setEditPageArtworkId: (state: Manager, {payload: artworkId}: PayloadAction<string | null>) => {
      state.editPageArtworkId = artworkId;
    },
  },
});

export const {setActivePage, setDetailsPageArtworkId, setEditPageArtworkId} = manager.actions;
export default manager.reducer;
