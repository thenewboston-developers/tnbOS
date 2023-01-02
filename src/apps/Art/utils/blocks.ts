import find from 'lodash/find';

import {Artwork, GenesisBlock, StandardBlock} from 'apps/Art/types';
import {Dict} from 'system/types/generic';

export const findBlockBySignature = (
  blockChain: Dict<GenesisBlock | StandardBlock>,
  signature: string | undefined,
): GenesisBlock | StandardBlock | undefined => {
  return find(Object.values(blockChain), ['signature', signature]);
};

export const getSecondToLastBlock = (artwork: Artwork): GenesisBlock | StandardBlock | undefined => {
  const blockChain = artwork.blockChain;
  const headBlockSignature = artwork.headBlockSignature!;
  const headBlock = findBlockBySignature(blockChain, headBlockSignature);
  return findBlockBySignature(blockChain, headBlock?.payload.blockId);
};
