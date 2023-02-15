import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import NetworkSelectCard from 'apps/SpeedTest/components/NetworkSelectCard';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

interface NetworkModalProps {
  close(): void;
}

const NetworkModal: SFC<NetworkModalProps> = ({className, close}) => {
  const networks = useSelector(getNetworks);

  const renderNetworkSelectCards = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['displayName']);
    return orderedNetworks.map(({networkId}) => <NetworkSelectCard key={networkId} networkId={networkId} />);
  };

  return (
    <S.Modal className={className} close={close} header="Select Network">
      {renderNetworkSelectCards()}
    </S.Modal>
  );
};

export default NetworkModal;
