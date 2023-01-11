import Learn from 'apps/University/containers/Learn';
import TopTabs from 'apps/University/containers/TopTabs';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

const University: SFC<AppProps> = ({className, display}) => {
  const renderTabContent = () => {
    return <Learn />;
  };

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <TopTabs />
        {renderTabContent()}
      </S.Container>
    </AppWindow>
  );
};

export default University;
