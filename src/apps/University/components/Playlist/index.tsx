import {useCourseLectures} from 'apps/University/hooks';
import {SFC} from 'system/types';

import Lecture from './Lecture';
import * as S from './Styles';

export interface PlaylistProps {
  courseId: string;
  displayDescriptions?: boolean;
}

const Playlist: SFC<PlaylistProps> = ({className, courseId, displayDescriptions = true}) => {
  const courseLectures = useCourseLectures(courseId);

  const renderLectures = () => {
    const lectures = courseLectures.map((lecture) => (
      <Lecture displayDescription={displayDescriptions} key={lecture.lectureId} lecture={lecture} />
    ));
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
