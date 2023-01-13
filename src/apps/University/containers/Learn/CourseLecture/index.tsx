import Breadcrumbs from 'apps/University/components/Breadcrumbs';
import {useActiveLearnLecture} from 'apps/University/hooks';
import {SFC} from 'system/types';
import * as S from './Styles';

const CourseLecture: SFC = ({className}) => {
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
    <S.Container className={className}>
      <Breadcrumbs />
      {renderVideoPlayer()}
      <S.Name>{lecture.name}</S.Name>
      <S.Description>{lecture.description}</S.Description>
    </S.Container>
  );
};

export default CourseLecture;
