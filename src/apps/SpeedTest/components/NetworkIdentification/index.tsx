import {useSelector} from 'react-redux';

import Identification from 'apps/SpeedTest/components/Identification';
import {useNetworkDisplayImage} from 'system/hooks';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';

export interface NetworkIdentificationProps {
  networkId: string;
}

const NetworkIdentification: SFC<NetworkIdentificationProps> = ({className, networkId}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);
  const networks = useSelector(getNetworks);

  const network = networks[networkId];

  return (
    <Identification
      bottomText={truncate(networkId, 24)}
      className={className}
      displayImage={networkDisplayImage}
      topText={network?.displayName || '-'}
    />
  );
};

export default NetworkIdentification;
