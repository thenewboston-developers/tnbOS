import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {useLatestRun} from 'apps/SpeedTest/hooks';
import {getRuns} from 'apps/SpeedTest/selectors/state';
import {setRun} from 'apps/SpeedTest/store/runs';
import {RunStatus} from 'apps/SpeedTest/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const TIMEOUT_SECONDS = 10;

const Timer: SFC = ({className}) => {
  const [time, setTime] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const latestRun = useLatestRun();
  const runs = useSelector(getRuns);

  useEffect(() => {
    if (latestRun?.status !== RunStatus.pending) return;

    const interval = setInterval(() => {
      const msDifference = new Date().getTime() - latestRun.requestTime;
      const seconds = (msDifference % 60000) / 1000;

      if (seconds > TIMEOUT_SECONDS) {
        const pendingRuns = Object.values(runs).filter(({status}) => status === RunStatus.pending);

        for (const run of pendingRuns) {
          dispatch(
            setRun({
              ...run,
              status: RunStatus.timeout,
            }),
          );
        }

        setTime(TIMEOUT_SECONDS);
      } else {
        setTime(seconds);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [dispatch, latestRun?.requestTime, latestRun?.status, runs]);

  useEffect(() => {
    if (!latestRun || latestRun.status === RunStatus.pending) return;

    if (latestRun.status === RunStatus.error) {
      setTime(0);
      return;
    }

    if (latestRun.status === RunStatus.timeout) {
      setTime(TIMEOUT_SECONDS);
      return;
    }

    const msDifference = latestRun.responseTime! - latestRun.requestTime;
    const seconds = (msDifference % 60000) / 1000;
    setTime(seconds);
  }, [latestRun]);

  return (
    <S.Container className={className}>
      <S.TopText>{time.toFixed(3)}</S.TopText>
      <S.BottomText>seconds</S.BottomText>
    </S.Container>
  );
};

export default Timer;
