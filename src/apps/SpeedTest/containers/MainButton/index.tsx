import {useDispatch, useSelector} from 'react-redux';

import {pingBlock} from 'apps/SpeedTest/blocks';
import {useIsConnected} from 'apps/SpeedTest/hooks';
import {getActiveAccountNumber, getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {setRun} from 'apps/SpeedTest/store/runs';
import {RunStatus} from 'apps/SpeedTest/types';
import {AppDispatch, SFC} from 'system/types';
import {currentSystemDate} from 'system/utils/dates';
import * as S from './Styles';

const MainButton: SFC = ({className}) => {
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const dispatch = useDispatch<AppDispatch>();
  const isConnected = useIsConnected();

  const handleClick = async () => {
    // TODO: Check for pending block
    if (!isConnected) return;

    const runId = crypto.randomUUID();

    await pingBlock({
      networkId: activeNetworkId!,
      params: {runId},
      recipient: activeAccountNumber!,
    });

    dispatch(
      setRun({
        networkId: activeNetworkId!,
        recipient: activeAccountNumber!,
        requestDate: currentSystemDate(),
        responseDate: null,
        runId,
        status: RunStatus.pending,
      }),
    );
  };

  return (
    <S.Container className={className} enabled={isConnected} onClick={handleClick}>
      GO
    </S.Container>
  );
};

export default MainButton;
