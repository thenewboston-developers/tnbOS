import {Block} from 'shared/types';
import store from 'system/store';
import {setNetworkBlock} from 'system/store/networkBlocks';
import {currentSystemDate} from 'system/utils/dates';

export const logNetworkBlock = (block: Block, networkId: string) => {
  if (block.amount === 0) return;

  store.dispatch(
    setNetworkBlock({
      networkBlock: {
        ...block,
        date: currentSystemDate(),
      },
      networkId,
    }),
  );
};
