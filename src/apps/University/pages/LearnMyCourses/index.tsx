import {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import Search from 'apps/University/components/Search';
import {useEnrolledCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {getAccounts} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';

import LearnMyCoursesEmptyStateGraphic from './assets/my-courses-empty-state.png';
import * as S from './Styles';

const LearnMyCourses: SFC = ({className}) => {
  const [searchText, setSearchText] = useState<string>('');
  const accounts = useSelector(getAccounts);
  const dispatch = useDispatch<AppDispatch>();
  const enrolledCourses = useEnrolledCourses();

  const courseList = useMemo(() => {
    let results = enrolledCourses;

    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();

      results = results.filter(({description, instructor, name}) => {
        const account = accounts[instructor];
        return (
          account?.displayName?.toLowerCase().includes(lowerCaseSearchText) ||
          description.toLowerCase().includes(lowerCaseSearchText) ||
          name.toLowerCase().includes(lowerCaseSearchText)
        );
      });
    }

    return orderBy(results, ['modifiedDate'], ['desc']);
  }, [accounts, enrolledCourses, searchText]);

  const handleClick = (courseId: string) => {
    dispatch(setActiveLearnCourseId(courseId));
    dispatch(setActivePage(Page.learnCourseHome));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const renderCourseCards = () => {
    return courseList.map((course) => (
      <CourseCard course={course} key={course.courseId} onClick={() => handleClick(course.courseId)} />
    ));
  };

  const renderPageContent = () => {
    if (!!courseList.length) {
      return <CourseCardsContainer>{renderCourseCards()}</CourseCardsContainer>;
    }

    return (
      <EmptyPage
        bottomText="Courses that you take will appear here."
        graphic={LearnMyCoursesEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return (
    <S.Container className={className}>
      <Search onChange={handleInputChange} />
      <S.PageContent>{renderPageContent()}</S.PageContent>
    </S.Container>
  );
};

export default LearnMyCourses;
