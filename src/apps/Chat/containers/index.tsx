import {useResendPendingMessages, useUpdateNotificationCount} from 'apps/Chat/hooks';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Chat/styles/fonts.css';

const Chat: SFC<AppProps> = ({className, display}) => {
  useResendPendingMessages();
  useUpdateNotificationCount();

  if (!display) return null;

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <S.Left />
        <S.Right />
      </S.Container>
    </AppWindow>
  );
};

export default Chat;
