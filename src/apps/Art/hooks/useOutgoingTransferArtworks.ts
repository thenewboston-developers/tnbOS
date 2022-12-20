import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import find from 'lodash/find';

import {getArtworks} from 'apps/Art/selectors/state';
import {Artwork, GenesisBlock, StandardBlock} from 'apps/Art/types';
import {getSelf} from 'system/selectors/state';
import {Dict} from 'system/types/generic';

const useOutgoingTransferArtworks = (): Dict<Artwork> => {
  const artworks = useSelector(getArtworks);
  const self = useSelector(getSelf);

  const findBlockBySignature = (
    blockChain: Dict<GenesisBlock | StandardBlock>,
    signature: string | undefined,
  ): GenesisBlock | StandardBlock | undefined => {
    return find(Object.values(blockChain), ['signature', signature]);
  };

  return useMemo(() => {
    return Object.entries(artworks).reduce((previousValue, [artworkId, artwork]) => {
      if (!artwork.attributes.inTransfer) return previousValue;
      if (artwork.attributes.owner === self.accountNumber) return previousValue;

      const blockChain = artwork.blockChain;
      const headBlockSignature = artwork.headBlockSignature!;
      const headBlock = findBlockBySignature(blockChain, headBlockSignature);
      const previousBlock = findBlockBySignature(blockChain, headBlock?.payload.blockId);

      if (previousBlock?.payload.owner !== self.accountNumber) return previousValue;

      return {
        ...previousValue,
        [artworkId]: artwork,
      };
    }, {});
  }, [artworks, self.accountNumber]);
};

export default useOutgoingTransferArtworks;
