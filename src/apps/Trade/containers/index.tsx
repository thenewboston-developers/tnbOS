import {
  useNewlyOnlineAccounts,
  useOfferSyncListener,
  useOfferSyncTask,
  useOrderApprovalStatusTask,
  useOrderFillStatusTask,
  useOrderPaymentStatusTask,
  useReceivingAccountTransferTask,
  useUpdateNotificationCount,
} from 'apps/Trade/hooks';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Trade/styles/fonts.css';

const Trade: SFC<AppProps> = ({className, display}) => {
  useOfferSyncListener();
  useOfferSyncTask();
  useNewlyOnlineAccounts();
  useOrderApprovalStatusTask();
  useOrderFillStatusTask();
  useOrderPaymentStatusTask();
  useReceivingAccountTransferTask();
  useUpdateNotificationCount();

  if (!display) return null;

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
