import {HoldingAccounts, TradeBalances} from 'apps/Trade/types';
import {Balances} from 'system/types';

export const getBalanceDetails = (
  balances: Balances,
  holdingAccounts: HoldingAccounts,
  networkId: string,
): TradeBalances => {
  const networkHoldingAccounts = holdingAccounts[networkId];

  const available = balances[networkId] || 0;
  const onHold = Object.values(networkHoldingAccounts).reduce((acc: number, holdingAccount) => {
    return acc + holdingAccount.balance;
  }, 0);

  return {
    available,
    onHold,
    total: available + onHold,
  };
};
