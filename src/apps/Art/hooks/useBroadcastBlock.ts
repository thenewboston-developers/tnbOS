import {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {setQueuedBlocksBlock} from 'apps/Art/blocks';
import {QueuedBlock} from 'apps/Art/types';
import {useOnlineAccountNumbers} from 'system/hooks';
import {getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast} from 'system/utils/toast';

const useBroadcastBlock = () => {
  const balances = useSelector(getBalances);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const onlineAccountNumbers = useOnlineAccountNumbers();

  return useCallback(
    async (block: QueuedBlock) => {
      for (const onlineAccountNumber of onlineAccountNumbers) {
        const recipient = onlineAccountNumber;

        const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
          balances,
          networkAccountOnlineStatuses,
          recipient,
        });

        if (!recipientsDefaultNetworkId) continue;

        try {
          await setQueuedBlocksBlock({
            networkId: recipientsDefaultNetworkId,
            params: [block],
            recipient,
          });
        } catch (error) {
          console.error(error);
          displayErrorToast('Error broadcasting block');
        }
      }
    },
    [balances, networkAccountOnlineStatuses, onlineAccountNumbers],
  );
};

export default useBroadcastBlock;
