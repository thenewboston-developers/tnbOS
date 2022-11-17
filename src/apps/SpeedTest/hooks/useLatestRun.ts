import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import {getRuns} from 'apps/SpeedTest/selectors/state';
import {Run} from 'apps/SpeedTest/types';

const useLatestRun = (): Run | undefined => {
  const runs = useSelector(getRuns);

  return useMemo(() => {
    const orderedRuns = orderBy(Object.values(runs), ['requestDate'], ['desc']);
    return orderedRuns[0];
  }, [runs]);
};

export default useLatestRun;
