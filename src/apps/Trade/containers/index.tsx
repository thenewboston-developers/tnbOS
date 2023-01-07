import {
  useOfferSyncListener,
  useOfferSyncTask,
  useNewlyOnlineAccounts,
  useReceivingAccountTransferTask,
} from 'apps/Trade/hooks';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Trade/styles/fonts.css';

const Trade: SFC<AppProps> = ({className, display}) => {
  useOfferSyncListener();
  useOfferSyncTask();
  useNewlyOnlineAccounts();
  useReceivingAccountTransferTask();

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <S.LeftMenu />
        <S.Right />
      </S.Container>
    </AppWindow>
  );
};

export default Trade;
