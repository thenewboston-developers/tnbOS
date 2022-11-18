import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {pingBlock} from 'apps/SpeedTest/blocks';
import {useIsConnected, usePendingRun} from 'apps/SpeedTest/hooks';
import {getActiveAccountNumber, getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {setRun} from 'apps/SpeedTest/store/runs';
import {RunStatus} from 'apps/SpeedTest/types';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import * as S from './Styles';

const MainButton: SFC = ({className}) => {
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useIsConnected();
  const pendingRun = usePendingRun();

  const enabled = useMemo((): boolean => {
    return isConnected && !pendingRun && !requestPending;
  }, [isConnected, pendingRun, requestPending]);

  const handleClick = async () => {
    if (!enabled) return;

    const run = {
      networkId: activeNetworkId!,
      recipient: activeAccountNumber!,
      requestDate: currentSystemDate(),
      requestTime: new Date().getTime(),
      responseTime: null,
      runId: crypto.randomUUID(),
      status: RunStatus.pending,
    };

    try {
      setRequestPending(true);
      dispatch(setRun(run));

      await pingBlock({
        networkId: activeNetworkId!,
        params: {
          runId: run.runId,
        },
        recipient: activeAccountNumber!,
      });
    } catch (error) {
      console.error(error);
      dispatch(
        setRun({
          ...run,
          status: RunStatus.error,
        }),
      );
    }

    setRequestPending(false);
  };

  return (
    <S.Container className={className} enabled={enabled} onClick={handleClick}>
      GO
    </S.Container>
  );
};

export default MainButton;
