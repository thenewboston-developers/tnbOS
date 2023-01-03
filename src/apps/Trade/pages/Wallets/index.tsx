import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Tab from 'apps/Trade/components/Tab';
import Tabs from 'apps/Trade/components/Tabs';
import PageHeader from 'apps/Trade/pages/PageHeader';
import NetworkListItem from 'apps/Trade/pages/Wallets/NetworkListItem';
import {getActiveWalletTab} from 'apps/Trade/selectors/state';
import {setActiveWalletTab} from 'apps/Trade/store/manager';
import {WalletTab} from 'apps/Trade/types';
import {getNetworks} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const Wallets: SFC = ({className}) => {
  const [activeNetworkId, setActiveNetworkId] = useState<string | null>(null);
  const activeWalletTab = useSelector(getActiveWalletTab);
  const dispatch = useDispatch<AppDispatch>();
  const networks = useSelector(getNetworks);

  const handleNetworkListItemClick = (networkId: string) => {
    setActiveNetworkId(networkId);
  };

  const handleTabClick = (walletTab: WalletTab) => {
    dispatch(setActiveWalletTab(walletTab));
  };

  const renderNetworkList = () => {
    return <S.NetworkList padding={8}>{renderNetworkListItems()}</S.NetworkList>;
  };

  const renderNetworkListItems = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['networkId']);
    return orderedNetworks.map((network) => (
      <NetworkListItem
        activeNetworkId={activeNetworkId}
        key={network.networkId}
        network={network}
        onClick={handleNetworkListItemClick}
      />
    ));
  };

  const renderRight = () => (
    <S.Right>
      {renderTabs()}
      {renderTabContent()}
    </S.Right>
  );

  const renderTabContent = () => {
    const tabContent = {
      [WalletTab.home]: <div>Wallet home</div>,
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
        {renderNetworkList()}
        {renderRight()}
      </S.ContentWrapper>
    </S.Container>
  );
};

export default Wallets;
