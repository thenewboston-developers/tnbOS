import {Block} from 'shared/types';
import {Dict} from 'system/types/generic';

export interface NetworkBlock extends Block {
  date: string;
}

export type NetworkBlocks = Dict<Dict<NetworkBlock>>;
