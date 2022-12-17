import {initialState as artworksInitialState, setArtworks} from 'apps/Art/store/artworks';
import {ART_ARTWORKS} from 'apps/Art/store/constants';
import {LocalElectronStore} from 'shared/types';
import {AppDispatch} from 'system/types';

const loadArtStoreData = (dispatch: AppDispatch, store: LocalElectronStore): void => {
  const artworks = store?.[ART_ARTWORKS] || artworksInitialState;
  dispatch(setArtworks(artworks));
};

export default loadArtStoreData;
