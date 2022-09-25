import axios from 'axios';

import {Block} from 'shared/types';
import {getAddress} from 'system/utils/addresses';

export const createBlock = async (block: Block, networkId: string) => {
  const address = getAddress(networkId);
  const {data} = await axios.post<Block>(`${address}/api/blocks`, block);
  return data;
};
