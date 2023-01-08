import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getNetworkBlocks} from 'system/selectors/state';
import {NetworkBlock} from 'system/types';
import {Dict} from 'system/types/generic';

const useNetworkBlocks = (networkId: string): Dict<NetworkBlock> => {
  const networkBlocks = useSelector(getNetworkBlocks);

  return useMemo(() => {
    return networkBlocks[networkId] || {};
  }, [networkBlocks, networkId]);
};

export default useNetworkBlocks;
