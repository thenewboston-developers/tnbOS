import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface CourseCardsContainerProps {
  children: ReactNode;
}

const CourseCardsContainer: SFC<CourseCardsContainerProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default CourseCardsContainer;
