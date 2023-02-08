import {Course} from 'apps/University/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface CourseCardProps {
  course: Course;
  onClick: GenericVoidFunction;
}

const CourseCard: SFC<CourseCardProps> = ({className, course, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Thumbnail thumbnailUrl={course.thumbnailUrl} />
      <S.Bottom>
        <S.Name>{course.name}</S.Name>
        <S.Description>{course.description}</S.Description>
        <S.Instructor accountNumber={course.instructor} />
      </S.Bottom>
    </S.Container>
  );
};

export default CourseCard;
