import {QueuedBlockPayload} from 'apps/Art/types/queuedBlocks';

export interface StandardBlock extends UnsignedStandardBlock {
  signature: string;
}

export interface UnsignedStandardBlock {
  payload: QueuedBlockPayload;
}
