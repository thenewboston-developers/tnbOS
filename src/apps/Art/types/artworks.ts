import {GenesisBlock} from 'apps/Art/types/genesisBlocks';
import {QueuedBlock} from 'apps/Art/types/queuedBlocks';
import {Dict} from 'system/types/generic';

export interface Artwork {
  attributes: Partial<ArtworkAttributes>;
  blockChain: Dict<GenesisBlock>;
  blockQueue: Dict<QueuedBlock>;
  blockQueueNeedsProcessing: boolean;
  headBlockSignature: string | null;
}

export interface ArtworkAttributes {
  artworkId: string;
  blockId?: string;
  createdDate: string;
  description: string;
  imageUrl: string;
  inTransfer: boolean;
  modifiedDate: string;
  name: string;
  owner: string;
}

export type Artworks = Dict<Artwork>;
