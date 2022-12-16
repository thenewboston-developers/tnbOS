export interface ArtworkIdPayload {
  currentTime: number;
}

export interface GenesisBlock extends UnsignedGenesisBlock {
  signature: string;
}

export interface GenesisBlockPayload {
  artworkId: string;
  blockId: string;
  createdDate: string;
  description: string;
  imageUrl: string;
  inTransfer: boolean;
  modifiedDate: string;
  name: string;
  owner: string;
}

export interface UnsignedGenesisBlock {
  artworkIdPayload: ArtworkIdPayload;
  payload: GenesisBlockPayload;
}
