import {useOfferSyncTask} from 'apps/Trade/hooks';
import OfferSyncListener from 'apps/Trade/tasks/OfferSyncListener';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';
import 'apps/Trade/styles/fonts.css';

const Trade: SFC<AppProps> = ({className, display}) => {
  useOfferSyncTask();

  const renderApp = () => (
    <AppWindow className={className} display={display}>
      <S.Container>
        <S.LeftMenu />
        <S.Right />
      </S.Container>
    </AppWindow>
  );

  const renderTasks = () => (
    <>
      <OfferSyncListener />
    </>
  );

  return (
    <>
      {renderTasks()}
      {renderApp()}
    </>
  );
};

export default Trade;
