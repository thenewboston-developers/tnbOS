import {setTransaction} from 'apps/Shop/store/transactions';
import {UnsignedBlock} from 'shared/types';
import {CORE_TRANSACTION_FEE} from 'system/constants/protocol';
import {createBlock} from 'system/core/blocks';
import store from 'system/store';
import {currentSystemDate} from 'system/utils/dates';
import {signData} from 'system/utils/signing';

interface CreateTransactionParams {
  amount: number;
  networkId: string;
  orderId: string;
  recipientAccountNumber: string;
  senderAccountNumber: string;
  senderSigningKey: string;
}

export const createTransaction = async ({
  amount,
  networkId,
  orderId,
  recipientAccountNumber,
  senderAccountNumber,
  senderSigningKey,
}: CreateTransactionParams) => {
  const data: UnsignedBlock = {
    amount,
    id: crypto.randomUUID(),
    payload: {},
    recipient: recipientAccountNumber,
    sender: senderAccountNumber,
    transaction_fee: CORE_TRANSACTION_FEE,
  };

  const block = signData(data, senderSigningKey);
  await createBlock(block, networkId);

  store.dispatch(
    setTransaction({
      ...block,
      date: currentSystemDate(),
      networkId,
      orderId,
    }),
  );
};
