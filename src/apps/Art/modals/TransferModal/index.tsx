import {useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountSelectCard from 'apps/Art/components/AccountSelectCard';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface TransferModalProps {
  close(): void;
}

const TransferModal: SFC<TransferModalProps> = ({className, close}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const accounts = useSelector(getAccounts);

  const renderAccountSelectCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    return orderedAccounts.map(({accountNumber}) => (
      <AccountSelectCard
        accountNumber={accountNumber}
        key={accountNumber}
        isSelected={accountNumber === selectedAccount}
        onClick={() => setSelectedAccount(accountNumber)}
      />
    ));
  };

  return (
    <S.Modal className={className} close={close} header="Transfer Artwork">
      {renderAccountSelectCards()}
    </S.Modal>
  );
};

export default TransferModal;
