import styled from 'styled-components';

import UCourseLeftMenu from './CourseLeftMenu';
import ULectureLeftMenu from './LectureLeftMenu';

export const Container = styled.div<{isLectureLeftMenuVisible: boolean}>`
  display: grid;
  grid-template-columns: ${({isLectureLeftMenuVisible}) =>
    isLectureLeftMenuVisible ? 'fit-content(250px) fit-content(250px) auto' : 'fit-content(250px) auto'};
  height: 100%;
  overflow-y: hidden;
`;

export const CourseLeftMenu = styled(UCourseLeftMenu)`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const LectureLeftMenu = styled(ULectureLeftMenu)`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;

export const Right = styled.div<{isLectureLeftMenuVisible: boolean}>`
  grid-column: ${({isLectureLeftMenuVisible}) => (isLectureLeftMenuVisible ? '3 / span 1' : '2 / span 1')};
  overflow-y: auto;
`;
