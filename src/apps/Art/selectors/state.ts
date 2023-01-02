import {Artworks, Page} from 'apps/Art/types';
import {RootState} from 'system/types';

export const getActivePage = (state: RootState): Page => state.art.manager.activePage;
export const getArtworks = (state: RootState): Artworks => state.art.artworks;
export const getCanvasArtworkId = (state: RootState): Page => state.art.manager.canvasArtworkId;
export const getDetailsPageArtworkId = (state: RootState): Page => state.art.manager.detailsPageArtworkId;
