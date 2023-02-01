import {useEffect, useMemo} from 'react';
import {useDispatch} from 'react-redux';

import {useUnreadMessages} from 'apps/Chat/hooks';
import {ChatRegistration} from 'apps/Chat/registration';
import {setNotificationCount} from 'system/store/notificationCounts';
import {AppDispatch} from 'system/types';

const useUpdateNotificationCount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const unreadMessages = useUnreadMessages();

  const notificationCount = useMemo(() => {
    return Object.values(unreadMessages).reduce(
      (previousValue, unreadMessageList) => previousValue + unreadMessageList.length,
      0,
    );
  }, [unreadMessages]);

  useEffect(() => {
    dispatch(setNotificationCount({appId: ChatRegistration.appId, notificationCount}));
  }, [dispatch, notificationCount]);
};

export default useUpdateNotificationCount;
