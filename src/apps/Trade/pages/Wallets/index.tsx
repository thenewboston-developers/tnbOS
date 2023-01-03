import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import EmptyState from 'apps/Trade/components/EmptyState';
import Tab from 'apps/Trade/components/Tab';
import Tabs from 'apps/Trade/components/Tabs';
import {useActiveWalletNetwork} from 'apps/Trade/hooks';
import PageHeader from 'apps/Trade/pages/PageHeader';
import NetworkMenuItem from 'apps/Trade/pages/Wallets/NetworkMenuItem';
import WalletHome from 'apps/Trade/pages/Wallets/WalletHome';
import {getActiveWalletTab} from 'apps/Trade/selectors/state';
import {setActiveWalletNetworkId, setActiveWalletTab} from 'apps/Trade/store/manager';
import {WalletTab} from 'apps/Trade/types';
import {getNetworks} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import RightEmptyStateGraphic from './assets/transactions-empty-state.png';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const activeWalletNetwork = useActiveWalletNetwork();
  const activeWalletTab = useSelector(getActiveWalletTab);
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);

  const handleNetworkMenuItemClick = (networkId: string) => {
    dispatch(setActiveWalletNetworkId(networkId));
  };

  const handleTabClick = (walletTab: WalletTab) => {
    dispatch(setActiveWalletTab(walletTab));
  };

  const renderNetworkMenu = () => {
    return <S.NetworkMenu padding={8}>{renderNetworkMenuItems()}</S.NetworkMenu>;
  };

  const renderNetworkMenuItems = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['networkId']);
    return orderedNetworks.map((network) => (
      <NetworkMenuItem key={network.networkId} network={network} onClick={handleNetworkMenuItemClick} />
    ));
  };

  const renderRight = () => {
    const content = activeWalletNetwork ? renderRightContent() : renderRightEmptyState();
    return <S.Right>{content}</S.Right>;
  };

  const renderRightContent = () => (
    <>
      {renderTabs()}
      {renderTabContent()}
    </>
  );

  const renderRightEmptyState = () => (
    <EmptyState
      bottomText="Select a network to view wallet details."
      graphic={RightEmptyStateGraphic}
      topText="Nothing here!"
    />
  );

  const renderTabContent = () => {
    const tabContent = {
      [WalletTab.home]: <WalletHome />,
      [WalletTab.send]: <div>Wallet send</div>,
      [WalletTab.receive]: <div>Wallet receive</div>,
    };
    return tabContent[activeWalletTab];
  };

  const renderTabs = () => (
    <Tabs>
      <Tab onClick={handleTabClick} walletTab={WalletTab.home}>
        Home
      </Tab>
      <Tab onClick={handleTabClick} walletTab={WalletTab.send}>
        Send
      </Tab>
      <Tab onClick={handleTabClick} walletTab={WalletTab.receive}>
        Receive
      </Tab>
    </Tabs>
  );

  return (
    <S.Container className={className}>
      <PageHeader title="Wallets" />
      <S.ContentWrapper>
        {renderNetworkMenu()}
        {renderRight()}
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Wallets;
