import {useDispatch, useSelector} from 'react-redux';

import LearnBreadcrumbs from 'apps/University/components/LearnBreadcrumbs';
import Playlist from 'apps/University/components/Playlist';
import {useActiveLearnLecture} from 'apps/University/hooks';
import {getActiveLearnLectureId} from 'apps/University/selectors/state';
import {setActivePage} from 'apps/University/store/manager';
import {Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import {displayErrorToast} from 'system/utils/toast';
import * as S from './Styles';

const LearnCourseLecture: SFC = ({className}) => {
  const activeLearnLectureId = useSelector(getActiveLearnLectureId);
  const dispatch = useDispatch<AppDispatch>();
  const lecture = useActiveLearnLecture();

  const renderIFrame = () => {
    return (
      <S.IFrame
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        src={`https://www.youtube.com/embed/${lecture!.youtubeId}?autoplay=1&rel=0`}
      />
    );
  };

  if (!lecture) {
    dispatch(setActivePage(Page.learnBrowse));
    displayErrorToast('The lecture you were viewing is no longer available');
    return null;
  }

  return (
    <>
      <LearnBreadcrumbs />
      <S.Container className={className}>
        <S.LectureContainer>
          {renderIFrame()}
          <S.Name>{lecture.name}</S.Name>
          <S.Description>{lecture.description}</S.Description>
        </S.LectureContainer>
        <S.PlaylistContainer>
          <Playlist activeLectureId={activeLearnLectureId} courseId={lecture.courseId} />
        </S.PlaylistContainer>
      </S.Container>
    </>
  );
};

export default LearnCourseLecture;
