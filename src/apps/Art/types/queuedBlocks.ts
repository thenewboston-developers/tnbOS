import {ArtworkAttributes} from 'apps/Art/types/artworks';
import {GenesisBlock} from 'apps/Art/types/blocks';

export type QueuedBlock = GenesisBlock;

export interface QueuedBlockPayload extends Partial<ArtworkAttributes> {
  artworkId: string;
  blockId: string;
  modifiedDate: string;
  owner: string;
}
