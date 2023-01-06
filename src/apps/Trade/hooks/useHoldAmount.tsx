import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getHoldingAccounts} from 'apps/Trade/selectors/state';
import {Order} from 'apps/Trade/types';
import {getSelf} from 'system/selectors/state';

const useHoldAmount = (order: Order): number => {
  const holdingAccounts = useSelector(getHoldingAccounts);
  const self = useSelector(getSelf);

  return useMemo(() => {
    if (order.host.accountNumber !== self.accountNumber) return 0;
    const holdingAccount = holdingAccounts[order.orderId];
    return holdingAccount ? holdingAccount.balance : 0;
  }, [holdingAccounts, order.host.accountNumber, order.orderId, self.accountNumber]);
};

export default useHoldAmount;
