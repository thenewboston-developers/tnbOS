import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {DEFAULT_SELECT_OPTION} from 'apps/Shop/constants/forms';
import {SelectOption} from 'apps/Shop/types';
import {getNetworks} from 'system/selectors/state';

const useNetworkSelectOptions = (): SelectOption[] => {
  const networks = useSelector(getNetworks);

  return useMemo(() => {
    const networkOptions = Object.values(networks).map(({networkId}) => ({value: networkId}));
    return [{value: DEFAULT_SELECT_OPTION}, ...networkOptions];
  }, [networks]);
};

export default useNetworkSelectOptions;
