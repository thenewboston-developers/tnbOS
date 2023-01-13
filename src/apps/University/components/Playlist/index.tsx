import {useCourseLectures} from 'apps/University/hooks';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

export interface PlaylistProps {
  courseId: string;
}

const Playlist: SFC<PlaylistProps> = ({className, courseId}) => {
  const courseLectures = useCourseLectures(courseId);

  const renderLectures = () => {
    const lectures = courseLectures.map((lecture) => <Lecture key={lecture.lectureId} lecture={lecture} />);
    return <S.Lectures>{lectures}</S.Lectures>;
  };

  return (
    <S.Container className={className}>
      <S.SectionHeading heading="Playlist" />
      {renderLectures()}
    </S.Container>
  );
};

export default Playlist;
