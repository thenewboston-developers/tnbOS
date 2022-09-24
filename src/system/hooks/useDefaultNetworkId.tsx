import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getBalances, getNetworkAccountOnlineStatuses} from 'system/selectors/state';
import {OnlineStatus} from 'system/types';

const useDefaultNetworkId = (recipient: string): string | null => {
  const balances = useSelector(getBalances);
  const networkAccountOnlineStatuses = useSelector(getNetworkAccountOnlineStatuses);

  return useMemo(() => {
    const balanceObjects = Object.entries(balances)
      .map(([networkId, balance]) => ({balance, networkId}))
      .filter(({balance}) => balance > 0);

    const availableNetworkIds = orderBy(balanceObjects, ['balance']).map(({networkId}) => networkId);

    const recipientNetworkIds = Object.keys(networkAccountOnlineStatuses).filter(
      (networkId) => networkAccountOnlineStatuses[networkId][recipient] === OnlineStatus.online,
    );

    for (const availableNetworkId of availableNetworkIds) {
      if (recipientNetworkIds.includes(availableNetworkId)) return availableNetworkId;
    }

    return null;
  }, [balances, networkAccountOnlineStatuses, recipient]);
};

export default useDefaultNetworkId;
