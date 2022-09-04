import {forwardRef, HTMLAttributes} from 'react';
import {useSelector} from 'react-redux';

import {GenericVoidFunction} from 'shared/types';
import {getBalances} from 'system/selectors/state';
import {Network} from 'system/types';
import * as S from './Styles';

export interface NetworkOptionProps extends HTMLAttributes<HTMLDivElement> {
  network: Network;
  onClick: GenericVoidFunction;
}

const NetworkOption = forwardRef<HTMLDivElement, NetworkOptionProps>(({className, network, onClick}, ref) => {
  const balances = useSelector(getBalances);

  return (
    <S.Container className={className} onClick={onClick} ref={ref}>
      <S.Img alt="logo" src={network.displayImage} />
      <S.Right>
        <S.DisplayName>{network.displayName}</S.DisplayName>
        <S.Balance>Balance: {balances[network.networkId]}</S.Balance>
      </S.Right>
    </S.Container>
  );
});

export default NetworkOption;
