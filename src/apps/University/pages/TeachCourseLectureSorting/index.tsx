import {DragEvent, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import DragSpacer from 'apps/University/components/DragSpacer';
import EmptyText from 'apps/University/components/EmptyText';
import TeachDashboard from 'apps/University/containers/TeachDashboard';
import {useCourseLectures} from 'apps/University/hooks';
import {getActiveTeachCourseId} from 'apps/University/selectors/state';
import {setLecture} from 'apps/University/store/lectures';
import {Lecture as TLecture} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';

import DraggableLecture from './DraggableLecture';
import * as S from './Styles';

const TeachCourseLectureSorting: SFC = ({className}) => {
  const [activeLecture, setActiveLecture] = useState<TLecture | null>(null);
  const activeTeachCourseId = useSelector(getActiveTeachCourseId);
  const courseLectures = useCourseLectures(activeTeachCourseId);
  const dispatch = useDispatch<AppDispatch>();

  const lectures = useMemo(() => {
    return orderBy(courseLectures, ['position']);
  }, [courseLectures]);

  const handleLectureDragEnd = () => {
    setActiveLecture(null);
  };

  const handleLectureDragStart = (_: DragEvent<HTMLDivElement>, lecture: TLecture) => {
    setActiveLecture(lecture);
  };

  const handleSpacerDrop = (e: DragEvent<HTMLDivElement>, spacerPosition: number) => {
    e.preventDefault();
    if (!activeLecture) return;

    const lecturesExcludingActiveLecture = lectures.filter(({lectureId}) => lectureId !== activeLecture?.lectureId);
    const startingLectures = lecturesExcludingActiveLecture.filter(({position}) => position < spacerPosition);
    const endingLectures = lecturesExcludingActiveLecture.filter(({position}) => position > spacerPosition);
    const newLectures = [...startingLectures, activeLecture, ...endingLectures];

    let position = 0;

    // TODO: Optimize this (bulk update)
    for (const newLecture of newLectures) {
      const lecture = {...newLecture, position};
      dispatch(setLecture(lecture));
      position += 1;
    }
  };

  const renderContent = () => {
    if (!!lectures.length) return renderDraggableLectures();
    return <EmptyText>No lectures to display.</EmptyText>;
  };

  const renderDraggableLectures = () => {
    return lectures.map((lecture) => {
      const spacerPosition = lecture.position + 0.5;
      return (
        <DraggableLecture
          key={lecture.lectureId}
          lecture={lecture}
          onDragEnd={() => handleLectureDragEnd()}
          onDragStart={(e) => handleLectureDragStart(e, lecture)}
          onSpacerDrop={(e) => handleSpacerDrop(e, spacerPosition)}
        />
      );
    });
  };

  return (
    <TeachDashboard>
      <S.Container className={className}>
        <S.SectionHeading heading="Lecture Sorting" />
        <DragSpacer key={-0.5} onDrop={(e) => handleSpacerDrop(e, -0.5)} />
        {renderContent()}
      </S.Container>
    </TeachDashboard>
  );
};

export default TeachCourseLectureSorting;
