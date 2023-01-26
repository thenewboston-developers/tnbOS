import {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import difference from 'lodash/difference';

import {setQueuedBlocksBlock} from 'apps/Art/blocks';
import {getArtworks} from 'apps/Art/selectors/state';
import {Artwork, QueuedBlock} from 'apps/Art/types';
import {getSecondToLastBlock} from 'apps/Art/utils/blocks';
import {useConnectedAccounts} from 'system/hooks';
import {getSelf} from 'system/selectors/state';
import {Dict} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';

let prevConnectedAccounts: Dict<string> = {};

const useOnConnection = () => {
  const artworks = useSelector(getArtworks);
  const connectedAccounts = useConnectedAccounts();
  const self = useSelector(getSelf);

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

  const connectedAccountNumbers = Object.keys(connectedAccounts);
  const prevConnectedAccountNumbers = Object.keys(prevConnectedAccounts);

  (async () => {
    for (const accountNumber of difference(connectedAccountNumbers, prevConnectedAccountNumbers)) {
      const shareableArtworks = getShareableArtworks(accountNumber);

      const blocks = shareableArtworks.reduce((previousValue: QueuedBlock[], artwork: Artwork) => {
        return [...previousValue, ...Object.values(artwork.blockChain)];
      }, []);

      if (!blocks.length) continue;

      try {
        await setQueuedBlocksBlock({
          networkId: connectedAccounts[accountNumber],
          params: blocks,
          recipient: accountNumber,
        });
      } catch (error) {
        console.error(error);
        displayErrorToast('Error broadcasting block');
      }
    }
  })();

  useEffect(() => {
    prevConnectedAccounts = connectedAccounts;
  }, [connectedAccounts]);
};

export default useOnConnection;
