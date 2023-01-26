import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {setQueuedBlocksBlock} from 'apps/Art/blocks';
import {QueuedBlock} from 'apps/Art/types';
import {useConnectedAccounts} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {displayErrorToast} from 'system/utils/toast';

const useBroadcastBlock = () => {
  const connectedAccounts = useConnectedAccounts();
  const self = useSelector(getSelf);

  const connectedAccountNumbers = Object.keys(connectedAccounts);

  return useCallback(
    async (block: QueuedBlock) => {
      for (const accountNumber of connectedAccountNumbers) {
        if (![accountNumber, self.accountNumber].includes(block.payload.owner)) continue;

        try {
          await setQueuedBlocksBlock({
            networkId: connectedAccounts[accountNumber],
            params: [block],
            recipient: accountNumber,
          });
        } catch (error) {
          console.error(error);
          displayErrorToast('Error broadcasting block');
        }
      }
    },
    [connectedAccountNumbers, connectedAccounts, self.accountNumber],
  );
};

export default useBroadcastBlock;
