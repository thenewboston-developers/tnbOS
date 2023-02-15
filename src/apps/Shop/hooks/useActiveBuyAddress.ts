import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getActiveBuyAddressId, getAddresses} from 'apps/Shop/selectors/state';
import {Address} from 'apps/Shop/types';

const useActiveBuyAddress = (): Address | undefined => {
  const activeBuyAddressId = useSelector(getActiveBuyAddressId);
  const addresses = useSelector(getAddresses);

  return useMemo(() => {
    return activeBuyAddressId ? addresses[activeBuyAddressId] : undefined;
  }, [activeBuyAddressId, addresses]);
};

export default useActiveBuyAddress;
