import {useDispatch, useSelector} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import {mdiRefresh} from '@mdi/js';

import HistoryRow from 'apps/SpeedTest/components/HistoryRow';
import {getRuns} from 'apps/SpeedTest/selectors/state';
import {setRuns} from 'apps/SpeedTest/store/runs';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const History: SFC = ({className}) => {
  const dispatch = useDispatch<AppDispatch>();
  const runs = useSelector(getRuns);

  const handleClick = () => {
    dispatch(setRuns({}));
  };

  const renderResetHistoryIcon = () => {
    if (isEmpty(runs)) return null;
    return (
      <div onClick={handleClick}>
        <S.Icon path={mdiRefresh} size="18px" />
      </div>
    );
  };

  const renderRows = () => {
    const orderedRuns = orderBy(Object.values(runs), ['requestDate'], ['desc']);
    return orderedRuns.map((run) => <HistoryRow key={run.runId} run={run} />);
  };

  return (
    <S.Container className={className}>
      <S.Header>
        <S.History>History</S.History>
        {renderResetHistoryIcon()}
      </S.Header>
      <S.Table>
        <thead>
          <tr>
            <S.Th>Account</S.Th>
            <S.Th>Network</S.Th>
            <S.Th>Date</S.Th>
            <S.Th>Speed</S.Th>
            <S.Th>Status</S.Th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </S.Table>
    </S.Container>
  );
};

export default History;
