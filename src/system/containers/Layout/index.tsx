import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import WebSocket from 'system/components/WebSocket';
import {useAccountOnlineStatusManager} from 'system/hooks';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  const networks = useSelector(getNetworks);
  useAccountOnlineStatusManager();

  const renderWebSockets = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['networkId']);
    return orderedNetworks.map(({networkId, port, protocol}) => (
      <WebSocket key={networkId} networkId={networkId} port={port} protocol={protocol} />
    ));
  };

  return (
    <S.Container className={className}>
      {renderWebSockets()}
      <S.MainArea />
      <S.Toolbar />
    </S.Container>
  );
};

export default Layout;
