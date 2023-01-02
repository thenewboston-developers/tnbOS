import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {ART_MANAGER} from 'apps/Art/store/constants';
import {Manager, Page} from 'apps/Art/types';

export const initialState: Manager = {
  activePage: Page.home,
  canvasArtworkId: null,
  detailsPageArtworkId: null,
};

const manager = createSlice({
  initialState,
  name: ART_MANAGER,
  reducers: {
    setActivePage: (state: Manager, {payload: page}: PayloadAction<Page>) => {
      state.activePage = page;
    },
    setCanvasArtworkId: (state: Manager, {payload: artworkId}: PayloadAction<string | null>) => {
      state.canvasArtworkId = artworkId;
    },
    setDetailsPageArtworkId: (state: Manager, {payload: artworkId}: PayloadAction<string | null>) => {
      state.detailsPageArtworkId = artworkId;
    },
  },
});

export const {setActivePage, setCanvasArtworkId, setDetailsPageArtworkId} = manager.actions;
export default manager.reducer;
