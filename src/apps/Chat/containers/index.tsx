import {useUnreadMessages} from 'apps/Chat/hooks';
import ResendPendingMessages from 'apps/Chat/tasks/ResendPendingMessages';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Chat/styles/fonts.css';

const Chat: SFC<AppProps> = ({className, display}) => {
  const unreadMessages = useUnreadMessages();

  const renderTasks = () => (
    <>
      <ResendPendingMessages />
    </>
  );

  return (
    <>
      {renderTasks()}
      <AppWindow className={className} display={display}>
        <S.Container>
          <S.Left unreadMessages={unreadMessages} />
          <S.Right unreadMessages={unreadMessages} />
        </S.Container>
      </AppWindow>
    </>
  );
};

export default Chat;
