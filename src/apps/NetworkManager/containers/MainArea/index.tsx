import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import NetworkCard from 'apps/NetworkManager/components/NetworkCard';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const networks = useSelector(getNetworks);

  const renderNetworkCards = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['domain']);
    return orderedNetworks.map((network) => <NetworkCard key={network.id} network={network} />);
  };

  return <S.Container className={className}>{renderNetworkCards()}</S.Container>;
};

export default MainArea;
