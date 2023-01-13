import {ReactNode} from 'react';
import {useSelector} from 'react-redux';

import {getActiveLearnPage} from 'apps/University/selectors/state';
import {LearnPage} from 'apps/University/types';
import {SFC} from 'system/types';

import Browse from './Browse';
import CourseHome from './CourseHome';
import CourseLecture from './CourseLecture';
import MyCourses from './MyCourses';
import Navigation from './Navigation';
import * as S from './Styles';

type LearnPageDict = {
  [key in LearnPage]: ReactNode;
};

const Learn: SFC = ({className}) => {
  const activeLearnPage = useSelector(getActiveLearnPage);

  const renderActiveLearnPage = () => {
    const learnPages: LearnPageDict = {
      [LearnPage.browse]: <Browse />,
      [LearnPage.courseHome]: <CourseHome />,
      [LearnPage.courseLecture]: <CourseLecture />,
      [LearnPage.myCourses]: <MyCourses />,
    };

    return learnPages[activeLearnPage];
  };

  return (
    <S.Container className={className}>
      <Navigation />
      <S.MainContent>{renderActiveLearnPage()}</S.MainContent>
    </S.Container>
  );
};

export default Learn;
