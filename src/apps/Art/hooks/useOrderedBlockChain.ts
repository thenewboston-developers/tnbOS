import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getArtworks} from 'apps/Art/selectors/state';
import {GenesisBlock, StandardBlock} from 'apps/Art/types';
import {Dict} from 'system/types/generic';

const useOrderedBlockChain = (artworkId?: string): Dict<GenesisBlock | StandardBlock> => {
  const artworks = useSelector(getArtworks);

  return useMemo(() => {
    if (!artworkId) return {};

    const artwork = artworks[artworkId];
    const blockChain = artwork.blockChain;
    let blockId = artworkId;
    const blocks: Dict<GenesisBlock | StandardBlock> = {};

    while (true) {
      const block = blockChain[blockId];

      if (block) {
        blocks[blockId] = block;
        blockId = block.signature;
      } else {
        break;
      }
    }

    return blocks;
  }, [artworkId, artworks]);
};

export default useOrderedBlockChain;
