import {useConnectedAccounts} from 'apps/University/hooks';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const University: SFC<AppProps> = ({className, display}) => {
  const connectedAccounts = useConnectedAccounts();
  console.log(connectedAccounts);

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <S.LeftMenu />
        <S.Right />
      </S.Container>
    </AppWindow>
  );
};

export default University;
