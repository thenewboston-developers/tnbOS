import orderBy from 'lodash/orderBy';

import {Balances, NetworkAccountOnlineStatuses, OnlineStatus} from 'system/types';

interface GetRecipientsDefaultNetworkId {
  balances: Balances;
  networkAccountOnlineStatuses: NetworkAccountOnlineStatuses;
  recipient: string;
}

export const getRecipientsDefaultNetworkId = ({
  balances,
  networkAccountOnlineStatuses,
  recipient,
}: GetRecipientsDefaultNetworkId): string | null => {
  const balanceObjects = Object.entries(balances)
    .map(([networkId, balance]) => ({balance, networkId}))
    .filter(({balance}) => balance > 0);

  const availableNetworkIds = orderBy(balanceObjects, ['balance'], ['desc']).map(({networkId}) => networkId);

  const recipientNetworkIds = Object.keys(networkAccountOnlineStatuses).filter(
    (networkId) => networkAccountOnlineStatuses[networkId][recipient] === OnlineStatus.online,
  );

  for (const availableNetworkId of availableNetworkIds) {
    if (recipientNetworkIds.includes(availableNetworkId)) return availableNetworkId;
  }

  return null;
};
