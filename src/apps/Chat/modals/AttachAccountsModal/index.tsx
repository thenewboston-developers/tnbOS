import {useMemo, useState} from 'react';
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

  const orderedAccounts = useMemo(() => {
    const accountList = Object.values(accounts);
    return orderBy(accountList, ['displayName']);
  }, [accounts]);

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
    const accountSelectCards = orderedAccounts.map(({accountNumber}) => (
      <AccountSelectCard
        accountNumber={accountNumber}
        key={accountNumber}
        onClick={() => handleAccountSelectCardClick(accountNumber)}
        selectedAccountNumbers={selectedAccountNumbers}
      />
    ));

    return <S.AccountSelectCardsContainer>{accountSelectCards}</S.AccountSelectCardsContainer>;
  };

  const renderEmptyAccounts = () => <S.ModalEmptyState heading="Nothing here!" helperText="No accounts to display" />;

  const renderModalContent = () => {
    if (!orderedAccounts.length) return renderEmptyAccounts();

    return (
      <>
        {renderAccountSelectCardsContainer()}
        <S.ButtonContainer>
          <Button onClick={handleButtonClick} text="Submit" />
        </S.ButtonContainer>
      </>
    );
  };

  return (
    <S.Modal className={className} close={close} header="Attach Accounts">
      {renderModalContent()}
    </S.Modal>
  );
};

export default AttachAccountsModal;
