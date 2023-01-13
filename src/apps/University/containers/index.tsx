import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import Learn from 'apps/University/containers/Learn';
import Teach from 'apps/University/containers/Teach';
import TopTabs from 'apps/University/containers/TopTabs';
import {getActiveTab} from 'apps/University/selectors/state';
import {Tab} from 'apps/University/types';
import AppWindow from 'system/components/AppWindow';
import {AppProps, SFC} from 'system/types';
import * as S from './Styles';

type TabDict = {
  [key in Tab]: ReactNode;
};

const University: SFC<AppProps> = ({className, display}) => {
  const activeTab = useSelector(getActiveTab);

  const renderActiveTab = () => {
    const tabs: TabDict = {
      [Tab.learn]: <Learn />,
      [Tab.teach]: <Teach />,
    };

    return tabs[activeTab];
  };

  return (
    <AppWindow className={className} display={display}>
      <S.Container>
        <TopTabs />
        {renderActiveTab()}
      </S.Container>
    </AppWindow>
  );
};

export default University;
