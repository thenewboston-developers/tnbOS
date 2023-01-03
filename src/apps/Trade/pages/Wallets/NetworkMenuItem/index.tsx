import {useSelector} from 'react-redux';

import {getActiveWalletNetworkId} from 'apps/Trade/selectors/state';
import {GenericVoidFunction} from 'shared/types';
import {getBalances} from 'system/selectors/state';
import {Network, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface NetworkMenuItemProps {
  network: Network;
  onClick: GenericVoidFunction;
}

const NetworkMenuItem: SFC<NetworkMenuItemProps> = ({className, network, onClick}) => {
  const activeWalletNetworkId = useSelector(getActiveWalletNetworkId);
  const balances = useSelector(getBalances);

  return (
    <S.Container
      className={className}
      isActive={activeWalletNetworkId === network.networkId}
      onClick={() => onClick(network.networkId)}
    >
      <S.NetworkLogo networkId={network.networkId} />
      <S.Right>
        <S.DisplayName>{network.displayName}</S.DisplayName>
        <S.NetworkId>{truncate(network.networkId, 24)}</S.NetworkId>
        <S.Balance>Balance: {balances[network.networkId].toLocaleString()}</S.Balance>
      </S.Right>
    </S.Container>
  );
};

export default NetworkMenuItem;
