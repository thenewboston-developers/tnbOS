import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const SpeedTest: SFC<AppProps> = ({className, display}) => {
  return (
    <AppWindow className={className} display={display}>
      <S.Container>SpeedTest</S.Container>
    </AppWindow>
  );
};

export default SpeedTest;
