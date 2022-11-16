import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {mdiCircle} from '@mdi/js';

import {useIsConnected} from 'apps/SpeedTest/hooks';
import {getActiveAccountNumber, getActiveNetworkId} from 'apps/SpeedTest/selectors/state';
import {ConnectionStatus as TConnectionStatus} from 'apps/SpeedTest/types';
import {SFC} from 'system/types';
import * as S from './Styles';

const ConnectionStatus: SFC = ({className}) => {
  const activeAccountNumber = useSelector(getActiveAccountNumber);
  const activeNetworkId = useSelector(getActiveNetworkId);
  const isConnected = useIsConnected();

  const connectionStatus = useMemo((): TConnectionStatus => {
    if (!activeAccountNumber || !activeNetworkId) return TConnectionStatus.invalid;
    return isConnected ? TConnectionStatus.connected : TConnectionStatus.disconnected;
  }, [activeAccountNumber, activeNetworkId, isConnected]);

  const renderText = () => {
    const text = {
      [TConnectionStatus.connected]: 'Connected',
      [TConnectionStatus.disconnected]: 'Disconnected',
      [TConnectionStatus.invalid]: '-',
    };
    return <S.Text>{text[connectionStatus]}</S.Text>;
  };

  return (
    <S.Container className={className}>
      <S.Icon path={mdiCircle} size="14px" status={connectionStatus} />
      <S.Text>{renderText()}</S.Text>
    </S.Container>
  );
};

export default ConnectionStatus;
