import {useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import NetworksEmptyStateGraphic from 'apps/NetworkManager/assets/networks-empty-state.png';
import NetworkModal from 'apps/NetworkManager/modals/NetworkModal';
import AppWindow from 'system/components/AppWindow';
import EmptyPage from 'system/components/EmptyPage';
import {useToggle} from 'system/hooks';
import {getNetworks} from 'system/selectors/state';
import {AppProps, SFC} from 'system/types';
import MainArea from './MainArea';
import Top from './Top';
import * as S from './Styles';

const NetworkManager: SFC<AppProps> = ({className, display}) => {
  const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
  const networks = useSelector(getNetworks);

  if (!display) return null;

  const renderEmptyPage = () => {
    return (
      <EmptyPage
        actionText="Add a network."
        bottomText="Networks allow you to communicate with other devices."
        graphic={NetworksEmptyStateGraphic}
        onActionTextClick={toggleNetworkModal}
        topText="Nothing here!"
      />
    );
  };

  const renderPageContent = () => {
    if (isEmpty(networks)) return renderEmptyPage();
    return (
      <>
        <Top />
        <MainArea />
      </>
    );
  };

  return (
    <>
      <AppWindow className={className} display={display}>
        <S.AppContainer>{renderPageContent()}</S.AppContainer>
      </AppWindow>
      {networkModalIsOpen ? <NetworkModal close={toggleNetworkModal} /> : null}
    </>
  );
};

export default NetworkManager;
