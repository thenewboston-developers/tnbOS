import {useSelector} from 'react-redux';

import Badge from 'apps/SpeedTest/components/Badge';
import * as S from 'apps/SpeedTest/containers/History/Styles';
import {Run} from 'apps/SpeedTest/types';
import {formatDate} from 'apps/SpeedTest/utils/dates';
import {useSafeDisplayName} from 'system/hooks';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';

export interface HistoryRowProps {
  run: Run;
}

const HistoryRow: SFC<HistoryRowProps> = ({className, run}) => {
  const displayName = useSafeDisplayName(run.recipient, 16);
  const networks = useSelector(getNetworks);

  const network = networks[run.networkId];

  const renderSpeed = () => {
    if (!run.responseTime) return '-';
    const msDifference = run.responseTime - run.requestTime;
    const seconds = (msDifference % 60000) / 1000;
    return `${seconds.toFixed(3)} seconds`;
  };

  return (
    <tr className={className}>
      <S.Td>{displayName}</S.Td>
      <S.Td>{network?.displayName || run.networkId}</S.Td>
      <S.Td>{formatDate(run.requestDate)}</S.Td>
      <S.Td>{renderSpeed()}</S.Td>
      <S.Td>
        <Badge status={run.status} />
      </S.Td>
    </tr>
  );
};

export default HistoryRow;
