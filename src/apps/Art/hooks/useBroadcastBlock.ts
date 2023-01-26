import {useCallback} from 'react';

import {setQueuedBlocksBlock} from 'apps/Art/blocks';
import {QueuedBlock} from 'apps/Art/types';
import {useConnectedAccounts} from 'system/hooks';
import {displayErrorToast} from 'system/utils/toast';

const useBroadcastBlock = () => {
  const connectedAccounts = useConnectedAccounts();

  const connectedAccountNumbers = Object.keys(connectedAccounts);

  return useCallback(
    async (block: QueuedBlock) => {
      for (const accountNumber of connectedAccountNumbers) {
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
    [connectedAccountNumbers, connectedAccounts],
  );
};

export default useBroadcastBlock;
