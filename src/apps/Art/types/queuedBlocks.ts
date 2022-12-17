import {ArtworkAttributes} from 'apps/Art/types/artworks';
import {GenesisBlock} from 'apps/Art/types/genesisBlocks';
import {StandardBlock} from 'apps/Art/types/standardBlocks';

export type QueuedBlock = GenesisBlock | StandardBlock;

export interface QueuedBlockPayload extends Partial<ArtworkAttributes> {
  artworkId: string;
  blockId: string;
  modifiedDate: string;
  owner: string;
}
