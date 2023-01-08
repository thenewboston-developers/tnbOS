import NetworkBlock from 'apps/Trade/components/NetworkBlock';
import {Transaction as TTransaction} from 'apps/Trade/types';
import {useNetworkDisplayName} from 'system/hooks';
import {SFC} from 'system/types';

export interface TransactionProps {
  transaction: TTransaction;
}

const Transaction: SFC<TransactionProps> = ({className, transaction}) => {
  const networkDisplayName = useNetworkDisplayName(transaction.networkId);

  return <NetworkBlock className={className} networkBlock={transaction} networkDisplayName={networkDisplayName} />;
};

export default Transaction;
