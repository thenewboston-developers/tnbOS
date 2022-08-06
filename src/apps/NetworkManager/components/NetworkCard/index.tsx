import {useDispatch} from 'react-redux';
import {mdiDotsVertical} from '@mdi/js';

import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import PopupMenu from 'system/components/DropdownMenu';
import {useToggle} from 'system/hooks';
import {deleteNetwork} from 'system/store/networks';
import {AppDispatch, Network, SFC} from 'system/types';
import * as S from './Styles';

export interface NetworkCardProps {
  network: Network;
}

const NetworkCard: SFC<NetworkCardProps> = ({className, network}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteNetwork = () => {
    dispatch(deleteNetwork(network.id));
  };

  const menuOptions = [
    {label: 'Edit', onClick: toggleNetworkModal},
    {label: 'Delete', onClick: handleDeleteNetwork},
  ];

  return (
    <>
      <S.Container className={className}>
        <S.Left>
          <S.NetworkLogo displayImage={network.displayImage} isOnline={false} />
          <S.LeftText>
            <S.Domain>{network.domain}</S.Domain>
            <S.DisplayName>{network.displayName}</S.DisplayName>
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