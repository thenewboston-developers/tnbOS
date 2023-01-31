import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import AccountCard from 'apps/AccountManager/components/AccountCard';
import CardsContainer from 'system/components/CardsContainer';
import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';

const MainArea: SFC = ({className}) => {
  const accounts = useSelector(getAccounts);

  const renderAccountCards = () => {
    const orderedAccounts = orderBy(Object.values(accounts), ['displayName']);
    return orderedAccounts.map((account) => <AccountCard account={account} key={account.accountNumber} />);
  };

  return <CardsContainer className={className}>{renderAccountCards()}</CardsContainer>;
};

export default MainArea;
