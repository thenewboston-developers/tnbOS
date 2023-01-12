import {SFC} from 'system/types';
import * as S from './Styles';

const CourseLecture: SFC = ({className}) => {
  const renderLectureDescription = () => {
    return (
      <S.LectureDescription>
        Bacon ipsum dolor amet tongue pancetta bresaola venison shankle. Pork swine meatloaf meatball, shankle
        tenderloin flank.
      </S.LectureDescription>
    );
  };

  const renderLectureTitle = () => {
    return <S.LectureTitle>Introduction to tnbOS</S.LectureTitle>;
  };

  const renderVideoPlayer = () => {
    return (
      <iframe
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder="0"
        height="360"
        src="https://www.youtube.com/embed/gFjxB0Jn8Wo"
        width="640"
      />
    );
  };

  return (
    <S.Container className={className}>
      {renderVideoPlayer()}
      {renderLectureTitle()}
      {renderLectureDescription()}
    </S.Container>
  );
};

export default CourseLecture;
