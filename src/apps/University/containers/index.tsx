import {
  useCourseRecordSyncTask,
  useOnConnection,
  useOnDisconnection,
  useOnResetCourseRecordRecipients,
} from 'apps/University/hooks';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const University: SFC<AppProps> = ({className, display}) => {
  useOnConnection();
  useOnDisconnection();
  useOnResetCourseRecordRecipients();
  useCourseRecordSyncTask();

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
