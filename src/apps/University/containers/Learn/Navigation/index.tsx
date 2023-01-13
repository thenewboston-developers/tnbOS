import {useDispatch, useSelector} from 'react-redux';

import NavigationItem from 'apps/University/components/NavigationItem';
import {getActiveLearnPage} from 'apps/University/selectors/state';
import {setActiveLearnPage} from 'apps/University/store/manager';
import {LearnPage} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

const Navigation: SFC = ({className}) => {
  const activeLearnPage = useSelector(getActiveLearnPage);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (learnPage: LearnPage) => {
    dispatch(setActiveLearnPage(learnPage));
  };

  return (
    <S.Container className={className}>
      <NavigationItem
        isActive={activeLearnPage === LearnPage.browse}
        onClick={() => handleClick(LearnPage.browse)}
        text="BROWSE"
      />
      <NavigationItem
        isActive={activeLearnPage === LearnPage.myCourses}
        onClick={() => handleClick(LearnPage.myCourses)}
        text="MY COURSES"
      />
    </S.Container>
  );
};

export default Navigation;
