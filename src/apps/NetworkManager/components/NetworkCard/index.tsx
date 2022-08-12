import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import PopupMenu from 'system/components/DropdownMenu';
import {useToggle} from 'system/hooks';
import {deleteBalance} from 'system/store/balances';
import {deleteNetwork} from 'system/store/networks';
import {AppDispatch, Network, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
import * as S from './Styles';

export interface NetworkCardProps {
  network: Network;
}

const NetworkCard: SFC<NetworkCardProps> = ({className, network}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteNetwork = () => {
    dispatch(deleteNetwork(network.networkId));
    dispatch(deleteBalance(network.networkId));
  };

  const menuOptions = [
    {label: 'Edit', onClick: toggleNetworkModal},
    {label: 'Delete', onClick: handleDeleteNetwork},
  ];

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.NetworkLogo connectionStatus={network.connectionStatus} displayImage={network.displayImage} />
          <S.LeftText>
            <S.DisplayName>{network.displayName}</S.DisplayName>
            <S.NetworkId>{truncate(network.networkId, 24)}</S.NetworkId>
          </S.LeftText>
        </S.Left>
        <S.Right>
          <PopupMenu icon={mdiDotsVertical} options={menuOptions} />
        </S.Right>
      </S.Container>
      {networkModalIsOpen ? <NetworkModal close={toggleNetworkModal} network={network} /> : null}
    </>
  );
};

export default NetworkCard;
