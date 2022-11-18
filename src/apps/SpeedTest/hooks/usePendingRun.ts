import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';

import {getRuns} from 'apps/SpeedTest/selectors/state';
import {Run, RunStatus} from 'apps/SpeedTest/types';

const usePendingRun = (): Run | undefined => {
  const runs = useSelector(getRuns);

  return useMemo(() => {
    const orderedRuns = orderBy(Object.values(runs), ['requestTime'], ['desc']);
    return find(orderedRuns, ['status', RunStatus.pending]);
  }, [runs]);
};

export default usePendingRun;
