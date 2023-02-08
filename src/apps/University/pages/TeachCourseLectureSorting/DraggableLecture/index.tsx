import {DragEventHandler} from 'react';
import {mdiDrag} from '@mdi/js';

import DragSpacer from 'apps/University/components/DragSpacer';
import ThumbnailMini from 'apps/University/components/ThumbnailMini';
import {Lecture} from 'apps/University/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface DraggableLectureProps {
  lecture: Lecture;
  onDragEnd: DragEventHandler<HTMLDivElement> | undefined;
  onDragStart: DragEventHandler<HTMLDivElement> | undefined;
  onSpacerDrop: DragEventHandler<HTMLDivElement> | undefined;
}

const DraggableLecture: SFC<DraggableLectureProps> = ({className, lecture, onDragEnd, onDragStart, onSpacerDrop}) => {
  const {description, name, thumbnailUrl} = lecture;

  return (
    <>
      <S.Container className={className} draggable onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <S.Icon icon={mdiDrag} size={24} />
        <ThumbnailMini thumbnailUrl={thumbnailUrl} />
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
