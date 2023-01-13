import {useActiveLearnCourse} from 'apps/University/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const CourseHome: SFC = ({className}) => {
  const course = useActiveLearnCourse();

  if (!course) return null;

  return (
    <S.Container className={className}>
      <div>
        <S.CourseName>{course.name}</S.CourseName>
        <S.Instructor accountNumber={course.instructor} />
        <S.CourseDescription>{course.description}</S.CourseDescription>
      </div>
      <div>
        <S.Thumbnail alt="thumbnail" src={course.thumbnailUrl} />
        <button>Take Course</button>
      </div>
    </S.Container>
  );
};

export default CourseHome;
