import {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import difference from 'lodash/difference';

import {setQueuedBlocksBlock} from 'apps/Art/blocks';
import {getArtworks} from 'apps/Art/selectors/state';
import {Artwork, QueuedBlock} from 'apps/Art/types';
import {getSecondToLastBlock} from 'apps/Art/utils/blocks';
import {getAccountOnlineStatuses, getBalances, getNetworkAccountOnlineStatuses, getSelf} from 'system/selectors/state';
import {AccountOnlineStatuses, OnlineStatus} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast} from 'system/utils/toast';

const useNewlyOnlineAccounts = () => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const artworks = useSelector(getArtworks);
  const balances = useSelector(getBalances);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const self = useSelector(getSelf);
  const [previousAccountOnlineStatuses, setPreviousAccountOnlineStatuses] = useState(accountOnlineStatuses);

  useEffect(() => {
    setPreviousAccountOnlineStatuses(accountOnlineStatuses);
  }, [accountOnlineStatuses, previousAccountOnlineStatuses]);

  const getOnlineAccountNumbers = (values: AccountOnlineStatuses): string[] => {
    return Object.entries(values).reduce((previousValue: string[], [accountNumber, onlineStatus]) => {
      return onlineStatus === OnlineStatus.online ? [...previousValue, accountNumber] : previousValue;
    }, []);
  };

  const getShareableArtworks = useCallback(
    (recipient: string): Artwork[] => {
      return Object.values(artworks).filter((artwork) => {
        const secondToLastBlock = getSecondToLastBlock(artwork);

        const recipientIsOwner = artwork.attributes.owner === recipient;
        const selfIsOwner = artwork.attributes.owner === self.accountNumber;
        const selfWasOwner = secondToLastBlock?.payload.owner === self.accountNumber;

        return selfIsOwner || (selfWasOwner && recipientIsOwner);
      });
    },
    [artworks, self.accountNumber],
  );

  if (JSON.stringify(accountOnlineStatuses) !== JSON.stringify(previousAccountOnlineStatuses)) {
    const onlineAccountNumbers = getOnlineAccountNumbers(accountOnlineStatuses);
    const prevOnlineAccountNumbers = getOnlineAccountNumbers(previousAccountOnlineStatuses);
    const newlyOnlineAccountNumbers = difference(onlineAccountNumbers, prevOnlineAccountNumbers);

    (async () => {
      for (const accountNumber of newlyOnlineAccountNumbers) {
        const recipient = accountNumber;

        const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
          balances,
          networkAccountOnlineStatuses,
          recipient,
        });

        if (!recipientsDefaultNetworkId) continue;

        const shareableArtworks = getShareableArtworks(recipient);

        const blocks = shareableArtworks.reduce((previousValue: QueuedBlock[], artwork: Artwork) => {
          return [...previousValue, ...Object.values(artwork.blockChain)];
        }, []);

        if (!blocks.length) continue;

        try {
          await setQueuedBlocksBlock({
            networkId: recipientsDefaultNetworkId,
            params: blocks,
            recipient,
          });
        } catch (error) {
          console.error(error);
          displayErrorToast('Error broadcasting block');
        }
      }
    })();
  }
};

export default useNewlyOnlineAccounts;
