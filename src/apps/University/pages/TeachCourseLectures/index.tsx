import {useSelector} from 'react-redux';

import Button from 'apps/University/components/Button';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useCourseLectures} from 'apps/University/hooks';
import LectureModal from 'apps/University/modals/LectureModal';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

const TeachCourseLectures: SFC = ({className}) => {
  const [lectureModalIsOpen, toggleLectureModal] = useToggle(false);
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courseLectures = useCourseLectures(activeTeachCourseId);

  const renderLectures = () => {
    return courseLectures.map((lecture) => <Lecture key={lecture.lectureId} lecture={lecture} />);
  };

  const renderLectureModal = () => {
    if (!lectureModalIsOpen) return null;
    return <LectureModal close={toggleLectureModal} />;
  };

  const renderNewLectureButton = () => {
    return <Button onClick={toggleLectureModal} text="New Lecture" />;
  };

  return (
    <>
      <TeachDashboard>
        <S.Container className={className}>
          <S.SectionHeading heading="Lectures" rightContent={renderNewLectureButton()} />
          {renderLectures()}
        </S.Container>
      </TeachDashboard>
      {renderLectureModal()}
    </>
  );
};

export default TeachCourseLectures;
