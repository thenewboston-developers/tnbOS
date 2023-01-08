import {useSelector} from 'react-redux';

import {getSelf} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const WalletReceive: SFC = ({className}) => {
  const self = useSelector(getSelf);

  return (
    <S.Container className={className}>
      <S.QrCopy accountNumber={self.accountNumber} width={160} />
    </S.Container>
  );
};

export default WalletReceive;
