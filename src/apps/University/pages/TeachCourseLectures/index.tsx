import {useSelector} from 'react-redux';

import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useCourseLectures} from 'apps/University/hooks';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

const TeachCourseLectures: SFC = ({className}) => {
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courseLectures = useCourseLectures(activeTeachCourseId);

  const renderLectures = () => {
    return courseLectures.map((lecture) => <Lecture key={lecture.lectureId} lecture={lecture} />);
  };

  return (
    <TeachDashboard>
      <S.Container className={className}>
        <S.SectionHeading heading="Lectures" />
        {renderLectures()}
      </S.Container>
    </TeachDashboard>
  );
};

export default TeachCourseLectures;
