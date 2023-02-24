import ConnectionStatus from 'apps/SpeedTest/containers/ConnectionStatus';
import History from 'apps/SpeedTest/containers/History';
import MainButton from 'apps/SpeedTest/containers/MainButton';
import Timer from 'apps/SpeedTest/containers/Timer';
import Top from 'apps/SpeedTest/containers/Top';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/SpeedTest/styles/fonts.css';

const SpeedTest: SFC<AppProps> = ({className, display}) => {
  if (!display) return null;

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <Top />
        <ConnectionStatus />
        <MainButton />
        <Timer />
        <History />
      </S.Container>
    </AppWindow>
  );
};

export default SpeedTest;
