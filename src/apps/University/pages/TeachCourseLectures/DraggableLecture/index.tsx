import {DragEventHandler} from 'react';
import {useDispatch} from 'react-redux';
import {mdiDrag} from '@mdi/js';

import DragSpacer from 'apps/University/components/DragSpacer';
import {setActivePage, setActiveTeachLectureId} from 'apps/University/store/manager';
import {Lecture as TLecture, Page} from 'apps/University/types';
import {AppDispatch, SFC} from 'system/types';
import * as S from './Styles';

export interface LectureProps {
  lecture: TLecture;
  onDragEnd: DragEventHandler<HTMLDivElement> | undefined;
  onDragStart: DragEventHandler<HTMLDivElement> | undefined;
  onSpacerDrop: DragEventHandler<HTMLDivElement> | undefined;
}

const DraggableLecture: SFC<LectureProps> = ({className, lecture, onDragEnd, onDragStart, onSpacerDrop}) => {
  const dispatch = useDispatch<AppDispatch>();

  const {description, lectureId, name, thumbnailUrl} = lecture;

  const handleClick = () => {
    dispatch(setActiveTeachLectureId(lectureId));
    dispatch(setActivePage(Page.teachCourseLectureDetails));
  };

  return (
    <>
      <S.Container className={className} draggable onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <S.Icon icon={mdiDrag} size={24} />
        <S.Thumbnail alt="thumbnail" src={thumbnailUrl} />
        <S.Details>
          <S.Name>{name}</S.Name>
          <S.Description>{description}</S.Description>
        </S.Details>
      </S.Container>
      <DragSpacer onDrop={onSpacerDrop} />
    </>
  );
};

export default DraggableLecture;
