import {useDispatch, useSelector} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import DropdownMenu from 'system/components/DropdownMenu';
import {deleteNetwork} from 'system/dispatchers/networks';
import {useToggle} from 'system/hooks';
import {getBalances} from 'system/selectors/state';
import {AppDispatch, Network, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface NetworkCardProps {
  network: Network;
}

const NetworkCard: SFC<NetworkCardProps> = ({className, network}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
  const balances = useSelector(getBalances);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteNetwork = () => {
    dispatch(deleteNetwork(network.networkId));
  };

  const menuOptions = [
    {label: 'Edit', onClick: toggleNetworkModal},
    {label: 'Delete', onClick: handleDeleteNetwork},
  ];

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.NetworkLogo displayImage={network.displayImage} networkId={network.networkId} />
          <S.LeftText>
            <S.DisplayName>{network.displayName}</S.DisplayName>
            <S.NetworkId>{truncate(network.networkId, 24)}</S.NetworkId>
            <S.Balance>Balance: {balances[network.networkId].toLocaleString()}</S.Balance>
          </S.LeftText>
        </S.Left>
        <S.Right>
          <DropdownMenu icon={mdiDotsVertical} options={menuOptions} />
        </S.Right>
      </S.Container>
      {networkModalIsOpen ? <NetworkModal close={toggleNetworkModal} network={network} /> : null}
    </>
  );
};

export default NetworkCard;
