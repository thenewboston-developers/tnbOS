import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks, getDetailsPageArtworkId} from 'apps/Art/selectors/state';
import {Artwork} from 'apps/Art/types';

const useDetailsPageArtwork = (): Artwork => {
  const artworks = useSelector(getArtworks);
  const detailsPageArtworkId = useSelector(getDetailsPageArtworkId);

  return useMemo(() => {
    return artworks[detailsPageArtworkId];
  }, [artworks, detailsPageArtworkId]);
};

export default useDetailsPageArtwork;
