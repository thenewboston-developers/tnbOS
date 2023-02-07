import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {mdiArrowRightBoldCircleOutline, mdiCheckBold, mdiDelete} from '@mdi/js';

import NoImage from 'apps/Chat/components/_Attachment/assets/no-image.png';
import * as S from 'apps/Chat/components/_Attachment/Styles';
import Tool from 'apps/Chat/components/Tool';
import {initializeNetworkRelatedObjects} from 'system/dispatchers/networks';
import {getNetworks, getSelf} from 'system/selectors/state';
import {setNetwork} from 'system/store/networks';
import {AppDispatch, Network, SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface NetworkAttachmentProps {
  attachedNetwork: Network;
  onDeleteClick: (networkId: string) => void;
  sender: string;
}

const NetworkAttachment: SFC<NetworkAttachmentProps> = ({attachedNetwork, className, onDeleteClick, sender}) => {
  const [toolsVisible, setToolsVisible] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);
  const self = useSelector(getSelf);

  const localNetwork = networks[attachedNetwork.networkId];

  const hasDifferences =
    attachedNetwork.displayImage !== localNetwork?.displayImage ||
    attachedNetwork.displayName !== localNetwork?.displayName ||
    attachedNetwork.port !== localNetwork?.port ||
    attachedNetwork.protocol !== localNetwork?.protocol;

  const handleDeleteClick = () => {
    onDeleteClick(attachedNetwork.networkId);
  };

  const handleIconClick = () => {
    if (!hasDifferences) return;

    if (!localNetwork) {
      dispatch(initializeNetworkRelatedObjects(attachedNetwork.networkId));
    }

    dispatch(setNetwork(attachedNetwork));
  };

  const handleMouseOut = () => {
    setToolsVisible(false);
  };

  const handleMouseOver = () => {
    setToolsVisible(true);
  };

  const renderAvatarURL = (network?: Network) => {
    const url = network?.displayImage ? truncate(network.displayImage, 16) : '-';
    return (
      <S.AlignCenter>
        <S.Label>Avatar URL</S.Label>
        <div>{url}</div>
      </S.AlignCenter>
    );
  };

  const renderCenter = () => {
    const path = hasDifferences ? mdiArrowRightBoldCircleOutline : mdiCheckBold;
    return (
      <S.Center>
        <div onClick={handleIconClick}>
          <S.Icon $hasDifferences={hasDifferences} path={path} size="48px" />
        </div>
      </S.Center>
    );
  };

  const renderDisplayImage = (network?: Network) => {
    const src = network?.displayImage ? network.displayImage : NoImage;
    return (
      <S.AlignCenter>
        <S.Img alt="display image" src={src} />
      </S.AlignCenter>
    );
  };

  const renderDisplayName = (network?: Network) => {
    const displayName = network?.displayName ? truncate(network.displayName, 16) : '-';
    return (
      <S.AlignCenter>
        <S.Label>Display Name</S.Label>
        <div>{displayName}</div>
      </S.AlignCenter>
    );
  };

  const renderPort = (network?: Network) => {
    const port = Number.isInteger(network?.port) ? network?.port : '-';
    return (
      <S.AlignCenter>
        <S.Label>Port</S.Label>
        <div>{port}</div>
      </S.AlignCenter>
    );
  };

  const renderProtocol = (network?: Network) => {
    const protocol = network?.protocol || '-';
    return (
      <S.AlignCenter>
        <S.Label>Protocol</S.Label>
        <div>{protocol}</div>
      </S.AlignCenter>
    );
  };

  const renderTools = () => {
    if (sender !== self.accountNumber || !toolsVisible) return null;
    return (
      <S.Tools>
        <Tool icon={mdiDelete} onClick={handleDeleteClick} />
      </S.Tools>
    );
  };

  return (
    <S.Container className={className} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
      <S.Top>Network: {truncate(attachedNetwork.networkId, 32)}</S.Top>
      <S.Bottom>
        <S.Left>
          <S.Heading>Attachment</S.Heading>
          {renderDisplayImage(attachedNetwork)}
          {renderDisplayName(attachedNetwork)}
          {renderAvatarURL(attachedNetwork)}
          {renderProtocol(attachedNetwork)}
          {renderPort(attachedNetwork)}
        </S.Left>
        {renderCenter()}
        <S.Right>
          <S.Heading>Yours</S.Heading>
          {renderDisplayImage(localNetwork)}
          {renderDisplayName(localNetwork)}
          {renderAvatarURL(localNetwork)}
          {renderProtocol(localNetwork)}
          {renderPort(localNetwork)}
        </S.Right>
      </S.Bottom>
      {renderTools()}
    </S.Container>
  );
};

export default NetworkAttachment;
