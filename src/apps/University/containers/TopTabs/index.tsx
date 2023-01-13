import {useDispatch, useSelector} from 'react-redux';

import {getActiveTab} from 'apps/University/selectors/state';
import {setActiveTab} from 'apps/University/store/manager';
import {Tab} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const TopTabs: SFC = ({className}) => {
  const activeTab = useSelector(getActiveTab);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (tab: Tab) => {
    dispatch(setActiveTab(tab));
  };

  const renderTabs = () => {
    return (
      <>
        <S.Tab isActive={activeTab === Tab.learn} onClick={() => handleClick(Tab.learn)}>
          Learn
        </S.Tab>
        <S.Tab isActive={activeTab === Tab.teach} onClick={() => handleClick(Tab.teach)}>
          Teach
        </S.Tab>
      </>
    );
  };

  return <S.Container className={className}>{renderTabs()}</S.Container>;
};

export default TopTabs;
