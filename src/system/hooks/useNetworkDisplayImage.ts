import {useSelector} from 'react-redux';

import UnknownNetwork from 'system/assets/unknown-network.png';
import {getNetworks} from 'system/selectors/state';

const useNetworkDisplayImage = (networkId: string) => {
  const networks = useSelector(getNetworks);

  const network = networks[networkId];

  return network?.displayImage || UnknownNetwork;
};

export default useNetworkDisplayImage;
