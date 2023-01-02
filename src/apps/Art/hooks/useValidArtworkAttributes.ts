import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks} from 'apps/Art/selectors/state';
import {ArtworkAttributes} from 'apps/Art/types';

const useValidArtworkAttributes = (): Partial<ArtworkAttributes>[] => {
  const artworks = useSelector(getArtworks);

  return useMemo(() => {
    return Object.values(artworks)
      .filter((artwork) => !!artwork.headBlockSignature)
      .map((artwork) => artwork.attributes);
  }, [artworks]);
};

export default useValidArtworkAttributes;
