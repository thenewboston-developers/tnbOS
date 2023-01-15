import {useSelector} from 'react-redux';
import noop from 'lodash/noop';

import Button from 'apps/University/components/Button';
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

  const renderNewLectureButton = () => {
    // TODO: Lecture modal logic
    return <Button onClick={noop} text="New Lecture" />;
  };

  return (
    <TeachDashboard>
      <S.Container className={className}>
        <S.SectionHeading heading="Lectures" rightContent={renderNewLectureButton()} />
        {renderLectures()}
      </S.Container>
    </TeachDashboard>
  );
};

export default TeachCourseLectures;
