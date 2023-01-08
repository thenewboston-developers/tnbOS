import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import difference from 'lodash/difference';

import {setOffersBlock} from 'apps/Trade/blocks';
import {getOffers, getOffersSync} from 'apps/Trade/selectors/state';
import {getAccountOnlineStatuses, getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {setOffersSyncRecipient} from 'apps/Trade/store/offersSync';
import {AccountOnlineStatuses, AppDispatch, OnlineStatus} from 'system/types';
import {getRecipientsDefaultNetworkId} from 'system/utils/networks';

let previousAccountOnlineStatuses: AccountOnlineStatuses = {};

const useNewlyOnlineAccounts = () => {
  const accountOnlineStatuses = useSelector(getAccountOnlineStatuses);
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);
  const offers = useSelector(getOffers);
  const offersSync = useSelector(getOffersSync);

  const getOnlineAccountNumbers = (values: AccountOnlineStatuses): string[] => {
    return Object.entries(values).reduce((previousValue: string[], [accountNumber, onlineStatus]) => {
      return onlineStatus === OnlineStatus.online ? [...previousValue, accountNumber] : previousValue;
    }, []);
  };

  const onlineAccountNumbers = getOnlineAccountNumbers(accountOnlineStatuses);
  const prevOnlineAccountNumbers = getOnlineAccountNumbers(previousAccountOnlineStatuses);

  (async () => {
    if (offersSync.modifiedDate === null) return;

    for (const accountNumber of difference(onlineAccountNumbers, prevOnlineAccountNumbers)) {
      const recipientsDefaultNetworkId = getRecipientsDefaultNetworkId({
        balances,
        networkAccountOnlineStatuses,
        recipient: accountNumber,
      });

      if (!recipientsDefaultNetworkId) continue;

      await setOffersBlock({
        networkId: recipientsDefaultNetworkId,
        params: {
          modifiedDate: offersSync.modifiedDate,
          offers,
        },
        recipient: accountNumber,
      });

      dispatch(
        setOffersSyncRecipient({
          accountNumber,
          delivered: false,
          deliveryAttempts: 1,
        }),
      );
    }
  })();

  useEffect(() => {
    previousAccountOnlineStatuses = accountOnlineStatuses;
  }, [accountOnlineStatuses]);
};

export default useNewlyOnlineAccounts;
