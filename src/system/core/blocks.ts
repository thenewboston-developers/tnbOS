import axios from 'axios';

import {Block} from 'shared/types';
import store from 'system/store';
import {setNetworkBlock} from 'system/store/networkBlocks';
import {getAddress} from 'system/utils/addresses';

export const createBlock = async (block: Block, networkId: string) => {
  const address = getAddress(networkId);
  const {data} = await axios.post<Block>(`${address}/api/blocks`, block);

  store.dispatch(
    setNetworkBlock({
      block,
      networkId,
    }),
  );

  return data;
};
