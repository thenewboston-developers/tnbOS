import {mdiPencil} from '@mdi/js';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface EditButtonProps {
  onClick: GenericVoidFunction;
}

const EditButton: SFC<EditButtonProps> = ({className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Icon path={mdiPencil} size="28px" />
    </S.Container>
  );
};

export default EditButton;
