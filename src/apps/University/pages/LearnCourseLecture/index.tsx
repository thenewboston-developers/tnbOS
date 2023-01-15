import LearnBreadcrumbs from 'apps/University/components/LearnBreadcrumbs';
import Playlist from 'apps/University/components/Playlist';
import {useActiveLearnLecture} from 'apps/University/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const LearnCourseLecture: SFC = ({className}) => {
  const lecture = useActiveLearnLecture();

  const renderVideoPlayer = () => {
    return (
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        height="360"
        src={`https://www.youtube.com/embed/${lecture!.youtubeId}`}
        width="640"
      />
    );
  };

  if (!lecture) return null;

  return (
    <>
      <LearnBreadcrumbs />
      <S.Container className={className}>
        <S.LectureContainer>
          {renderVideoPlayer()}
          <S.Name>{lecture.name}</S.Name>
          <S.Description>{lecture.description}</S.Description>
        </S.LectureContainer>
        <S.PlaylistContainer>
          <Playlist courseId={lecture.courseId} />
        </S.PlaylistContainer>
      </S.Container>
    </>
  );
};

export default LearnCourseLecture;
