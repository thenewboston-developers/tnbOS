import {DragEvent, DragEventHandler, useState} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface SpacerProps {
  onDrop: DragEventHandler<HTMLDivElement> | undefined;
}

const Spacer: SFC<SpacerProps> = ({className, onDrop}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    if (!onDrop) return;
    setIsActive(false);
    onDrop(e);
  };

  return (
    <S.Container
      className={className}
      isActive={isActive}
      onDragEnter={() => setIsActive(true)}
      onDragLeave={() => setIsActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    />
  );
};

export default Spacer;
