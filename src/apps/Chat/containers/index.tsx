import {useUpdateNotificationCount} from 'apps/Chat/hooks';
import ResendPendingMessages from 'apps/Chat/tasks/ResendPendingMessages';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Chat/styles/fonts.css';

const Chat: SFC<AppProps> = ({className, display}) => {
  useUpdateNotificationCount();

  const renderAppWindow = () => {
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

  const renderTasks = () => (
    <>
      <ResendPendingMessages />
    </>
  );

  return (
    <>
      {renderAppWindow()}
      {renderTasks()}
    </>
  );
};

export default Chat;
