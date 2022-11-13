import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountCard from 'apps/SpeedTest/components/AccountCard';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface AccountModalProps {
  close(): void;
}

const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
  const accounts = useSelector(getAccounts);

  const renderAccountCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    return orderedAccounts.map(({accountNumber}) => <AccountCard accountNumber={accountNumber} key={accountNumber} />);
  };

  return (
    <S.Modal className={className} close={close} header="Select Account">
      {renderAccountCards()}
    </S.Modal>
  );
};

export default AccountModal;
