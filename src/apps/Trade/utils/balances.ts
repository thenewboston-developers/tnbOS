import {HoldingAccount, HoldingAccounts, TradeBalances} from 'apps/Trade/types';
import {Balances, Dict} from 'system/types';

export const getBalanceDetails = (
  balances: Balances,
  holdingAccounts: HoldingAccounts,
  networkId: string,
): TradeBalances => {
  const available = balances[networkId] || 0;
  const networkHoldingAccounts: Dict<HoldingAccount> | undefined = holdingAccounts[networkId];
  let onHold = 0;

  if (networkHoldingAccounts) {
    onHold = Object.values(networkHoldingAccounts).reduce((acc: number, holdingAccount) => {
      return acc + holdingAccount.balance;
    }, 0);
  }

  return {
    available,
    onHold,
    total: available + onHold,
  };
};
