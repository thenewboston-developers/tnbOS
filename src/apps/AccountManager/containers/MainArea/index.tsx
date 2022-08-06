import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountCard from 'apps/AccountManager/components/AccountCard';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const accounts = useSelector(getAccounts);

  const renderAccountCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    return orderedAccounts.map((account) => <AccountCard account={account} key={account.accountNumber} />);
  };

  return <S.Container className={className}>{renderAccountCards()}</S.Container>;
};

export default MainArea;
