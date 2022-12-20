import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks} from 'apps/Art/selectors/state';
import {Artwork} from 'apps/Art/types';
import {getSelf} from 'system/selectors/state';
import {Dict} from 'system/types/generic';

const useIncomingTransferArtworks = (): Dict<Artwork> => {
  const artworks = useSelector(getArtworks);
  const self = useSelector(getSelf);

  return useMemo(() => {
    return Object.entries(artworks).reduce((previousValue, [artworkId, artwork]) => {
      if (!artwork.attributes.inTransfer) return previousValue;
      if (artwork.attributes.owner !== self.accountNumber) return previousValue;

      return {
        ...previousValue,
        [artworkId]: artwork,
      };
    }, {});
  }, [artworks, self.accountNumber]);
};

export default useIncomingTransferArtworks;
