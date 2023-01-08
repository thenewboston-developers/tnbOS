import {useSelector} from 'react-redux';

import UnknownNetwork from 'system/assets/unknown-network.png';
import {getNetworks} from 'system/selectors/state';

const useNetworkDisplayImage = (networkId: string | null) => {
  const networks = useSelector(getNetworks);

  if (!networkId) return UnknownNetwork;
  const network = networks[networkId];
  return network?.displayImage || UnknownNetwork;
};

export default useNetworkDisplayImage;
