import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks, getEditPageArtworkId} from 'apps/Art/selectors/state';
import {ArtworkAttributes} from 'apps/Art/types';

const useEditPageArtworkAttributes = (): Partial<ArtworkAttributes> | null => {
  const artworks = useSelector(getArtworks);
  const editPageArtworkId = useSelector(getEditPageArtworkId);

  return useMemo(() => {
    return artworks[editPageArtworkId] ? artworks[editPageArtworkId].attributes : null;
  }, [artworks, editPageArtworkId]);
};

export default useEditPageArtworkAttributes;
