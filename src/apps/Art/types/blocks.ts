export interface ArtworkIdBlock extends UnsignedBlock<ArtworkIdPayload> {
  signature: string;
}

export interface ArtworkIdPayload {
  currentTime: number;
  pid: string;
}

export interface GenesisBlock extends UnsignedBlock<GenesisBlockPayload> {
  signature: string;
}

export interface GenesisBlockPayload {
  artworkId: string;
  artworkIdBlock: ArtworkIdBlock;
  blockId: string;
  createdDate: string;
  description: string;
  imageUrl: string;
  inTransfer: boolean;
  modifiedDate: string;
  name: string;
}

export interface UnsignedBlock<Payload> {
  owner: string;
  payload: Payload;
}
