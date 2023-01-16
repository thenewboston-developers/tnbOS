import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import Button from 'apps/University/components/Button';
import EmptyText from 'apps/University/components/EmptyText';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useCourseLectures} from 'apps/University/hooks';
import LectureModal from 'apps/University/modals/LectureModal';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {useToggle} from 'system/hooks';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

const TeachCourseLectureList: SFC = ({className}) => {
  const [lectureModalIsOpen, toggleLectureModal] = useToggle(false);
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courseLectures = useCourseLectures(activeTeachCourseId);

  const sortedLectures = useMemo(() => {
    return orderBy(courseLectures, ['position']);
  }, [courseLectures]);

  const renderContent = () => {
    if (!!sortedLectures.length) return renderLectures();
    return <EmptyText>No lectures to display.</EmptyText>;
  };

  const renderLectures = () => {
    return sortedLectures.map((lecture) => <Lecture key={lecture.lectureId} lecture={lecture} />);
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
          {renderContent()}
        </S.Container>
      </TeachDashboard>
      {renderLectureModal()}
    </>
  );
};

export default TeachCourseLectureList;
