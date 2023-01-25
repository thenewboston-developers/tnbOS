import orderBy from 'lodash/orderBy';

import EmptyText from 'apps/University/components/EmptyText';
import {useCourseLectures} from 'apps/University/hooks';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

export interface PlaylistProps {
  activeLectureId?: string;
  courseId: string;
}

const Playlist: SFC<PlaylistProps> = ({activeLectureId, className, courseId}) => {
  const courseLectures = useCourseLectures(courseId);

  const renderContent = () => {
    if (!!courseLectures.length) return renderLectures();
    return <EmptyText>This playlist does not contain any lectures.</EmptyText>;
  };

  const renderLectures = () => {
    const lectures = orderBy(courseLectures, ['position']).map((lecture) => (
      <Lecture key={lecture.lectureId} isActive={lecture.lectureId === activeLectureId} lecture={lecture} />
    ));
    return <S.Lectures>{lectures}</S.Lectures>;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Playlist" />
      {renderContent()}
    </S.Container>
  );
};

export default Playlist;
