import {useCallback, useEffect, useMemo, useState} from 'react';

import CircleProgress from 'apps/Shop/components/CircleProgress';
import {SFC} from 'system/types';
import * as S from './Styles';

interface CountdownTimerProps {
  endDate: string;
  startDate: string;
}

const CountdownTimer: SFC<CountdownTimerProps> = ({className, endDate, startDate}) => {
  const [minutesRemaining, setMinutesRemaining] = useState<number | null>(null);
  const [percentage, setPercentage] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number | null>(null);

  const remainingTimeSeconds = useCallback(() => {
    const end = new Date(endDate);
    const now = new Date();
    if (now > end) return 0;
    return (end.getTime() - now.getTime()) / 1000;
  }, [endDate]);

  const renderCircleProgress = () => {
    if (percentage === 0) return null;
    return (
      <S.CircleProgressContainer>
        <CircleProgress diameter={14} percentage={percentage} />
      </S.CircleProgressContainer>
    );
  };

  const renderTimeRemaining = () => {
    if (minutesRemaining === null || secondsRemaining === null) return '-';
    return `${minutesRemaining} minutes ${secondsRemaining} seconds`;
  };

  const totalTimeSeconds = useMemo(() => {
    const end = new Date(endDate);
    const start = new Date(startDate);
    return (end.getTime() - start.getTime()) / 1000;
  }, [endDate, startDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const percentageRemaining = Math.floor((remainingTimeSeconds() / totalTimeSeconds) * 100);
      setMinutesRemaining(Math.floor(remainingTimeSeconds() / 60));
      setSecondsRemaining(Math.floor(remainingTimeSeconds() % 60));
      setPercentage(percentageRemaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [remainingTimeSeconds, totalTimeSeconds]);

  return (
    <S.Container className={className}>
      {renderCircleProgress()}
      {renderTimeRemaining()}
    </S.Container>
  );
};

export default CountdownTimer;
