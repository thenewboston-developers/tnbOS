import {useMemo} from 'react';
import {useSelector} from 'react-redux';

import {getNotificationCounts} from 'system/selectors/state';

const useNotificationCount = (appId: string): number => {
  const notificationCounts = useSelector(getNotificationCounts);

  return useMemo(() => {
    return notificationCounts[appId] || 0;
  }, [appId, notificationCounts]);
};

export default useNotificationCount;
