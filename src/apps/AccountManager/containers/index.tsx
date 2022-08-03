import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const AccountManager: SFC<AppProps> = ({className, display}) => {
  return (
    <AppWindow className={className} display={display}>
      <S.Container>Account Manager</S.Container>
    </AppWindow>
  );
};

export default AccountManager;
