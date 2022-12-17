import {ART_ARTWORKS} from 'apps/Art/store/constants';
import {Artworks} from 'apps/Art/types';

export interface ArtElectronStore {
  [ART_ARTWORKS]: Artworks;
}
