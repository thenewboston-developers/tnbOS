import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {TradeRegistration} from 'apps/Trade/registration';
import {getResolutions} from 'apps/Trade/selectors/state';
import {setNotificationCount} from 'system/store/notificationCounts';
import {ResolutionStatus} from 'apps/Trade/types';
import {AppDispatch} from 'system/types';

const useUpdateNotificationCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resolutions = useSelector(getResolutions);

  const notificationCount = useMemo(() => {
    const unresolvedResolutions = Object.values(resolutions).filter(
      ({resolutionStatus}) => resolutionStatus === ResolutionStatus.unresolved,
    );
    return unresolvedResolutions.length;
  }, [resolutions]);

  useEffect(() => {
    dispatch(setNotificationCount({appId: TradeRegistration.appId, notificationCount}));
  }, [dispatch, notificationCount]);
};

export default useUpdateNotificationCount;
