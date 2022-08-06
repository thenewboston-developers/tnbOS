import {useSelector} from 'react-redux';

import NetworkCard from 'apps/NetworkManager/components/NetworkCard';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const MainArea: SFC = ({className}) => {
  const networks = useSelector(getNetworks);

  const renderNetworkCards = () => {
    // TODO: Sort alphabetically
    return Object.values(networks).map((network) => <NetworkCard key={network.id} network={network} />);
  };

  // TODO: Empty state
  return <S.Container className={className}>{renderNetworkCards()}</S.Container>;
};

export default MainArea;
