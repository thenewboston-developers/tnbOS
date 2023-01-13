import {SFC} from 'system/types';
import * as S from './Styles';

const CourseHome: SFC = ({className}) => {
  const renderLectureDescription = () => {
    return (
      <S.LectureDescription>
        In this course, ipsum dolor amet tongue pancetta bresaola venison shankle. Pork swine meatloaf meatball, shackle
        tenderloin flank. Bacon beef ribs bacon jowl shoulder short ribs turducken boudin. Beef ribs shankle short ribs
        pastrami spare ribs frankfurter.
      </S.LectureDescription>
    );
  };

  const renderLectureTitle = () => {
    return <S.LectureTitle>Introduction to tnbOS</S.LectureTitle>;
  };

  const renderThumbnail = () => {
    return <S.Thumbnail alt="thumbnail" src="https://i.imgur.com/qVOKobs.png" />;
  };

  return (
    <S.Container className={className}>
      <div>
        {renderLectureTitle()}
        <S.Instructor accountNumber="f8595108c232da7e6e0906ca309bf93bbdce774d2830cc107e8dec9927e7bcc0" />
        {renderLectureDescription()}
      </div>
      <div>
        {renderThumbnail()}
        <button>Take Course</button>
      </div>
    </S.Container>
  );
};

export default CourseHome;
