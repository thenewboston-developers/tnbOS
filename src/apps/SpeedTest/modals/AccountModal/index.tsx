import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountSelectCard from 'apps/SpeedTest/components/AccountSelectCard';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AccountModalProps {
  close(): void;
}

const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
  const accounts = useSelector(getAccounts);

  const renderAccountSelectCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    return orderedAccounts.map(({accountNumber}) => (
      <AccountSelectCard accountNumber={accountNumber} key={accountNumber} />
    ));
  };

  return (
    <S.Modal className={className} close={close} header="Select Account">
      {renderAccountSelectCards()}
    </S.Modal>
  );
};

export default AccountModal;
