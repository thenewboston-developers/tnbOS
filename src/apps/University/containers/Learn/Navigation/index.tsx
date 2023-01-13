import {useDispatch, useSelector} from 'react-redux';

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
      <S.Item isActive={activeLearnPage === LearnPage.browse} onClick={() => handleClick(LearnPage.browse)}>
        BROWSE
      </S.Item>
      <S.Item isActive={activeLearnPage === LearnPage.myCourses} onClick={() => handleClick(LearnPage.myCourses)}>
        MY COURSES
      </S.Item>
    </S.Container>
  );
};

export default Navigation;
