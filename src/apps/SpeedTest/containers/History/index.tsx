import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import HistoryRow from 'apps/SpeedTest/components/HistoryRow';
import {getRuns} from 'apps/SpeedTest/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const History: SFC = ({className}) => {
  const runs = useSelector(getRuns);

  const renderRows = () => {
    const orderedRuns = orderBy(Object.values(runs), ['requestDate'], ['desc']);
    return orderedRuns.map((run) => <HistoryRow key={run.runId} run={run} />);
  };

  return (
    <S.Container className={className}>
      <S.Heading>History</S.Heading>
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
