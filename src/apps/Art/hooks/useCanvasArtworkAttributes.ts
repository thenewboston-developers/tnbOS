import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks, getCanvasArtworkId} from 'apps/Art/selectors/state';
import {ArtworkAttributes} from 'apps/Art/types';

const useCanvasArtworkAttributes = (): Partial<ArtworkAttributes> | null => {
  const artworks = useSelector(getArtworks);
  const canvasArtworkId = useSelector(getCanvasArtworkId);

  return useMemo(() => {
    return artworks[canvasArtworkId] ? artworks[canvasArtworkId].attributes : null;
  }, [artworks, canvasArtworkId]);
};

export default useCanvasArtworkAttributes;
