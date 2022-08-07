import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import MainArea from './MainArea';
import Top from './Top';
import * as S from './Styles';

const AccountManager: SFC<AppProps> = ({className, display}) => {
  return (
    <AppWindow className={className} display={display}>
      <S.AppContainer>
        <Top />
        <MainArea />
      </S.AppContainer>
    </AppWindow>
  );
};

export default AccountManager;
