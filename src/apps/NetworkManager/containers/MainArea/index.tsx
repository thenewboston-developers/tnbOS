import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import NetworkCard from 'apps/NetworkManager/components/NetworkCard';
import CardsContainer from 'system/components/CardsContainer';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';

const MainArea: SFC = ({className}) => {
  const networks = useSelector(getNetworks);

  const renderNetworkCards = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['displayName', 'networkId']);
    return orderedNetworks.map((network) => <NetworkCard key={network.networkId} network={network} />);
  };

  return <CardsContainer className={className}>{renderNetworkCards()}</CardsContainer>;
};

export default MainArea;
