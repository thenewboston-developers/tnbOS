import {useSelector} from 'react-redux';

import * as S from 'apps/SpeedTest/containers/History/Styles';
import {Run} from 'apps/SpeedTest/types';
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
    if (!run.responseDate) return '-';

    const requestDate = new Date(run.requestDate);
    const responseDate = new Date(run.responseDate);

    const msDifference = responseDate.getTime() - requestDate.getTime();
    const seconds = (msDifference % 60000) / 1000;

    return `${seconds.toFixed(3)} seconds`;
  };

  return (
    <tr className={className}>
      <S.Td>{displayName}</S.Td>
      <S.Td>{network?.displayName || run.networkId}</S.Td>
      <S.Td>{run.requestDate}</S.Td>
      <S.Td>{renderSpeed()}</S.Td>
      <S.Td>{run.status}</S.Td>
    </tr>
  );
};

export default HistoryRow;
