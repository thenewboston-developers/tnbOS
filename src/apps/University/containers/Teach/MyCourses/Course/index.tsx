import {useDispatch} from 'react-redux';

import {setActiveTeachCourseId, setActiveTeachPage} from 'apps/University/store/manager';
import {Course as TCourse, TeachPage} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface CourseProps {
  course: TCourse;
}

const Course: SFC<CourseProps> = ({className, course}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {courseId, description, name, thumbnailUrl} = course;

  const handleClick = () => {
    dispatch(setActiveTeachCourseId(courseId));
    dispatch(setActiveTeachPage(TeachPage.courseDetails));
  };

  return (
    <S.Container className={className} onClick={handleClick}>
      <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
      <S.Details>
        <S.Name>{name}</S.Name>
        <S.Description>{description}</S.Description>
      </S.Details>
    </S.Container>
  );
};

export default Course;
