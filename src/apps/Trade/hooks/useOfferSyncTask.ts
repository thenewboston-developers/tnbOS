import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setOffersBlock} from 'apps/Trade/blocks';
import {MAX_OFFER_DELIVERY_ATTEMPTS, OFFER_SYNC_TASK_RUN_INTERVAL_SECONDS} from 'apps/Trade/constants/protocol';
import {getOffers, getOffersSync} from 'apps/Trade/selectors/state';
import {setOffersSyncRecipient} from 'apps/Trade/store/offersSync';
import {OffersSync} from 'apps/Trade/types';
import {useOnlineAccountNumbers} from 'system/hooks';
import {getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {AppDispatch} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';
import {displayErrorToast} from 'system/utils/toast';

const useOfferSyncTask = () => {
  const [previousOffersSync, setPreviousOffersSync] = useState<OffersSync | null>(null);
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const offers = useSelector(getOffers);
  const offersSync = useSelector(getOffersSync);
  const onlineAccountNumbers = useOnlineAccountNumbers();

  useEffect(() => {
    setPreviousOffersSync(offersSync);
  }, [offersSync]);

  const recipientAccountNumbers = useMemo((): string[] => {
    const offersSyncRecipients = Object.values(offersSync.recipients);

    const excludedAccountNumbers = offersSyncRecipients
      .filter(({delivered, deliveryAttempts}) => delivered || deliveryAttempts >= MAX_OFFER_DELIVERY_ATTEMPTS)
      .map((offersSyncRecipient) => offersSyncRecipient.accountNumber);

    return onlineAccountNumbers.filter((accountNumber) => !excludedAccountNumbers.includes(accountNumber));
  }, [offersSync.recipients, onlineAccountNumbers]);

  const run = useCallback(() => {
    (async () => {
      try {
        for (const recipientAccountNumber of recipientAccountNumbers) {
          const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
            balances,
            networkAccountOnlineStatuses,
            recipient: recipientAccountNumber,
          });

          if (offersSync.modifiedDate === null || !recipientsDefaultNetworkId) continue;

          await setOffersBlock({
            networkId: recipientsDefaultNetworkId,
            params: {
              modifiedDate: offersSync.modifiedDate,
              offers,
            },
            recipient: recipientAccountNumber,
          });

          const offersSyncRecipient = offersSync.recipients[recipientAccountNumber];
          const deliveryAttempts = offersSyncRecipient ? offersSyncRecipient.deliveryAttempts + 1 : 1;

          dispatch(
            setOffersSyncRecipient({
              accountNumber: recipientAccountNumber,
              delivered: false,
              deliveryAttempts,
            }),
          );
        }
      } catch (error) {
        displayErrorToast('Error resending the message');
      }
    })();
  }, [balances, dispatch, networkAccountOnlineStatuses, offers, offersSync, recipientAccountNumbers]);

  useEffect(() => {
    if (offersSync.modifiedDate !== previousOffersSync?.modifiedDate) run();
  }, [offersSync.modifiedDate, previousOffersSync?.modifiedDate, run]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), OFFER_SYNC_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useOfferSyncTask;
