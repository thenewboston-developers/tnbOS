import EmptyText from 'apps/University/components/EmptyText';
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

  const renderContent = () => {
    if (!!courseLectures.length) return renderLectures();
    return <EmptyText>This playlist does not contain any lectures.</EmptyText>;
  };

  const renderLectures = () => {
    const lectures = courseLectures.map((lecture) => (
      <Lecture displayDescription={displayDescriptions} key={lecture.lectureId} lecture={lecture} />
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
