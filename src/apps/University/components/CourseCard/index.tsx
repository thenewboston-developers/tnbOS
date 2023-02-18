import {Course} from 'apps/University/types';
import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import {truncate} from 'system/utils/strings';
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
        <S.Details>
          <S.Name>{truncate(course.name, 48)}</S.Name>
          <S.Description>{truncate(course.description, 72)}</S.Description>
        </S.Details>
        <S.Instructor accountNumber={course.instructor} />
      </S.Bottom>
    </S.Container>
  );
};

export default CourseCard;
