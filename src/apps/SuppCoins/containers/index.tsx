import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const SuppCoins: SFC<AppProps> = ({className, display}) => {
  return (
    <AppWindow className={className} display={display}>
      <S.AppContainer>SuppCoins</S.AppContainer>
    </AppWindow>
  );
};

export default SuppCoins;
