import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import WebSocket from 'system/components/WebSocket';
import {getNetworks} from 'system/selectors/state';
import {SFC} from 'system/types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  const networks = useSelector(getNetworks);

  const renderWebSockets = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['domain']);
    return orderedNetworks.map(({domain, id, port, protocol}) => (
      <WebSocket domain={domain} key={id} port={port} protocol={protocol} />
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
