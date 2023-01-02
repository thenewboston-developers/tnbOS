import {QueuedBlock} from 'apps/Art/types/queuedBlocks';

export enum ArtFn {
  setQueuedBlocks = 'setQueuedBlocks',
}

export type SetQueuedBlocksParams = QueuedBlock[];
