import {ArtworkAttributes} from 'apps/Art/types/artworks';

export interface ArtworkIdPayload {
  currentTime: number;
}

export interface GenesisBlock extends UnsignedGenesisBlock {
  signature: string;
}

export interface GenesisBlockPayload extends ArtworkAttributes {
  blockId: string;
}

export interface UnsignedGenesisBlock {
  artworkIdPayload: ArtworkIdPayload;
  payload: GenesisBlockPayload;
}
