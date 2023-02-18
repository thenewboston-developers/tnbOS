import {ChangeEvent, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import CourseCard from 'apps/University/components/CourseCard';
import CourseCardsContainer from 'apps/University/components/CourseCardsContainer';
import {useAvailableCourses} from 'apps/University/hooks';
import {setActiveLearnCourseId, setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import EmptyPage from 'system/components/EmptyPage';
import {getAccounts} from 'system/selectors/state';
import {AppDispatch, SFC} from 'system/types';

import LearnBrowseEmptyStateGraphic from './assets/browse-empty-state.png';
import * as S from './Styles';

const LearnBrowse: SFC = ({className}) => {
  const [searchText, setSearchText] = useState<string>('');
  const accounts = useSelector(getAccounts);
  const availableCourses = useAvailableCourses();
  const dispatch = useDispatch<AppDispatch>();

  const courseList = useMemo(() => {
    let results = availableCourses;

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
  }, [accounts, availableCourses, searchText]);

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
        bottomText="Courses from connected accounts will appear here."
        graphic={LearnBrowseEmptyStateGraphic}
        topText="Nothing here!"
      />
    );
  };

  return (
    <S.Container className={className}>
      <S.Search>
        <S.Input onChange={handleInputChange} placeholder="Search courses..." type="text" />
      </S.Search>
      <S.PageContent>{renderPageContent()}</S.PageContent>
    </S.Container>
  );
};

export default LearnBrowse;
