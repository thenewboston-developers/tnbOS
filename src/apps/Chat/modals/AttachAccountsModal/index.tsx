import {useState} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountSelectCard from 'apps/Chat/components/AccountSelectCard';
import Button from 'apps/Chat/components/Button';
import {GenericVoidFunction} from 'shared/types';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AttachAccountsModalProps {
  attachedAccountNumbers: string[];
  close(): void;
  setAttachedAccountNumbers: GenericVoidFunction;
}

const AttachAccountsModal: SFC<AttachAccountsModalProps> = ({
  attachedAccountNumbers,
  className,
  close,
  setAttachedAccountNumbers,
}) => {
  const [selectedAccountNumbers, setSelectedAccountNumbers] = useState<string[]>(attachedAccountNumbers);
  const accounts = useSelector(getAccounts);

  const handleAccountSelectCardClick = (accountNumber: string) => {
    const results = selectedAccountNumbers.includes(accountNumber)
      ? selectedAccountNumbers.filter((item) => item !== accountNumber)
      : [...selectedAccountNumbers, accountNumber];
    setSelectedAccountNumbers(results);
  };

  const handleButtonClick = () => {
    setAttachedAccountNumbers(selectedAccountNumbers);
    close();
  };

  const renderAccountSelectCardsContainer = () => {
    const accountsList = Object.values(accounts);
    const orderedAccounts = orderBy(accountsList, ['displayName']);

    const accountSelectCards = orderedAccounts.map(({accountNumber}) => {
      return (
        <AccountSelectCard
          accountNumber={accountNumber}
          key={accountNumber}
          onClick={() => handleAccountSelectCardClick(accountNumber)}
          selectedAccountNumbers={selectedAccountNumbers}
        />
      );
    });

    return <S.AccountSelectCardsContainer>{accountSelectCards}</S.AccountSelectCardsContainer>;
  };

  return (
    <S.Modal className={className} close={close} header="Attach Accounts">
      {renderAccountSelectCardsContainer()}
      <S.ButtonContainer>
        <Button onClick={handleButtonClick} text="Submit" />
      </S.ButtonContainer>
    </S.Modal>
  );
};

export default AttachAccountsModal;
