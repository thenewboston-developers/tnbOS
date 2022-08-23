import {Dict} from 'system/types/generic';

export interface NetworkPeerRequests {
  networkId: string;
  setPeers: PeerRequestDetails;
  getPeers: PeerRequestDetails;
}

export interface PeerRequestDetails {
  lastRequestDate: string | null;
  lastRequestId: string | null;
  lastResponseId: string | null;
}

export enum PeerRequestMethod {
  setPeers = 'setPeers',
  getPeers = 'getPeers',
}

export type PeerRequestManager = Dict<NetworkPeerRequests>;
