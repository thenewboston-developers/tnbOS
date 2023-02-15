import {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {RECEIVING_ACCOUNT_TRANSFER_TASK_RUN_INTERVAL_SECONDS} from 'apps/Trade/constants/protocol';
import {getOrders, getReceivingAccounts, getTransactions} from 'apps/Trade/selectors/state';
import {setReceivingAccount} from 'apps/Trade/store/receivingAccounts';
import {setTransaction} from 'apps/Trade/store/transactions';
import {FillStatus, PaymentStatus, ReceivingAccount} from 'apps/Trade/types';
import {getReceivingAccountOutgoingTransactions} from 'apps/Trade/utils/receivingAccounts';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import {getSelf} from 'system/selectors/state';
import {AppDispatch, Dict} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import {getLiveBalance} from 'system/utils/liveBalances';
import {signData} from 'system/utils/signing';

const useReceivingAccountTransferTask = () => {
  const [transfersInProgress, setTransfersInProgress] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(getOrders);
  const receivingAccounts = useSelector(getReceivingAccounts);
  const self = useSelector(getSelf);
  const transactions = useSelector(getTransactions);

  const completedOrderIds = useMemo((): string[] => {
    return Object.values(orders)
      .filter(({fillStatus}) => fillStatus === FillStatus.complete)
      .filter(({paymentStatus}) => paymentStatus === PaymentStatus.complete)
      .map(({orderId}) => orderId);
  }, [orders]);

  const hasOutgoingTransactions = useCallback(
    (receivingAccount: ReceivingAccount): boolean => {
      const outgoingTransactions = getReceivingAccountOutgoingTransactions(receivingAccount, transactions);
      return !!outgoingTransactions.length;
    },
    [transactions],
  );

  const receivingAccountsRequiringTransfers = useMemo((): ReceivingAccount[] => {
    return Object.values(receivingAccounts).reduce(
      (acc: ReceivingAccount[], receivingAccountDict: Dict<ReceivingAccount>) => {
        const results = Object.values(receivingAccountDict)
          .filter(({fundsTransferredOut}) => !fundsTransferredOut)
          .filter(({orderId}) => completedOrderIds.includes(orderId))
          .filter(({orderId}) => !transfersInProgress.includes(orderId))
          .filter((receivingAccount) => !hasOutgoingTransactions(receivingAccount));
        return [...acc, ...results];
      },
      [],
    );
  }, [completedOrderIds, hasOutgoingTransactions, receivingAccounts, transfersInProgress]);

  const transferToNetworkAccount = useCallback(
    async (receivingAccount: ReceivingAccount) => {
      const balance = await getLiveBalance(receivingAccount.accountNumber, receivingAccount.networkId);

      const data: UnsignedBlock = {
        amount: balance - CORE_TRANSACTION_FEE,
        id: crypto.randomUUID(),
        payload: {},
        recipient: self.accountNumber,
        sender: receivingAccount.accountNumber,
        transaction_fee: CORE_TRANSACTION_FEE,
      };

      const block = signData(data, receivingAccount.signingKey);
      await createBlock(block, receivingAccount.networkId);

      dispatch(
        setReceivingAccount({
          ...receivingAccount,
          fundsTransferredOut: true,
        }),
      );

      dispatch(
        setTransaction({
          ...block,
          date: currentSystemDate(),
          networkId: receivingAccount.networkId,
          orderId: receivingAccount.orderId,
        }),
      );
    },
    [dispatch, self],
  );

  const run = useCallback(() => {
    (async () => {
      for (const receivingAccount of receivingAccountsRequiringTransfers) {
        const {orderId} = receivingAccount;
        setTransfersInProgress([...transfersInProgress, orderId]);
        await transferToNetworkAccount(receivingAccount);
        setTransfersInProgress(transfersInProgress.filter((_orderId) => _orderId !== orderId));
      }
    })();
  }, [receivingAccountsRequiringTransfers, transferToNetworkAccount, transfersInProgress]);

  useEffect(() => {
    const runInterval = setInterval(() => run(), RECEIVING_ACCOUNT_TRANSFER_TASK_RUN_INTERVAL_SECONDS * 1000);
    return () => clearInterval(runInterval);
  }, [run]);
};

export default useReceivingAccountTransferTask;
