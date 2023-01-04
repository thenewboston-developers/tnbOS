import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';

import EmptyPage from 'apps/Trade/components/EmptyPage';
import EmptyState from 'apps/Trade/components/EmptyState';
import PageHeader from 'apps/Trade/components/PageHeader';
import Tab from 'apps/Trade/components/Tab';
import Tabs from 'apps/Trade/components/Tabs';
import {useActiveWalletNetwork} from 'apps/Trade/hooks';
import NetworkMenuItem from 'apps/Trade/pages/Wallets/NetworkMenuItem';
import WalletHome from 'apps/Trade/pages/Wallets/WalletHome';
import WalletReceive from 'apps/Trade/pages/Wallets/WalletReceive';
import WalletSend from 'apps/Trade/pages/Wallets/WalletSend';
import {getActiveWalletTab} from 'apps/Trade/selectors/state';
import {setActiveWalletNetworkId, setActiveWalletTab} from 'apps/Trade/store/manager';
import {WalletTab} from 'apps/Trade/types';
import {getNetworks} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import TransactionsEmptyStateGraphic from './assets/transactions-empty-state.png';
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

  const renderEmptyPage = () => {
    return (
      <EmptyPage
        bottomText="Add a network to begin trading."
        graphic={TransactionsEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  const renderNetworkMenu = () => {
    return <S.NetworkMenu padding={8}>{renderNetworkMenuItems()}</S.NetworkMenu>;
  };

  const renderNetworkMenuItems = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['displayName', 'networkId']);
    return orderedNetworks.map((network) => (
      <NetworkMenuItem key={network.networkId} network={network} onClick={handleNetworkMenuItemClick} />
    ));
  };

  const renderPageContent = () => {
    if (isEmpty(networks)) return renderEmptyPage();

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
      graphic={TransactionsEmptyStateGraphic}
      topText="Nothing here!"
    />
  );

  const renderTabContent = () => {
    const tabContent = {
      [WalletTab.home]: <WalletHome />,
      [WalletTab.send]: <WalletSend />,
      [WalletTab.receive]: <WalletReceive />,
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

  return renderPageContent();
};

export default Wallets;
