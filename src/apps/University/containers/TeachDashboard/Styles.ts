import styled, {css} from 'styled-components';

import UCourseLeftMenu from './CourseLeftMenu';
import ULectureLeftMenu from './LectureLeftMenu';

const leftMenuMixin = css`
  grid-column: 1 / span 1;
  overflow-y: auto;
`;

export const Container = styled.div`
  display: grid;
  grid-template-columns: 250px auto;
  height: 100%;
  overflow-y: hidden;
`;

export const CourseLeftMenu = styled(UCourseLeftMenu)`
  ${leftMenuMixin};
`;

export const LectureLeftMenu = styled(ULectureLeftMenu)`
  ${leftMenuMixin};
`;

export const Right = styled.div`
  grid-column: 2 / span 1;
  overflow-y: auto;
`;
