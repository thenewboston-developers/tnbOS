import {useSelector} from 'react-redux';

import {getAccounts} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const accounts = useSelector(getAccounts);

  const renderAccountCards = () => {
    console.log(accounts);
    return 'Account cards here';
  };

  return <S.Container className={className}>{renderAccountCards()}</S.Container>;
};

export default MainArea;
