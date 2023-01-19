import {mdiArrowLeft} from '@mdi/js';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuBackProps {
  children: string;
  onClick: GenericVoidFunction;
}

const LeftMenuBack: SFC<LeftMenuBackProps> = ({children, className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      <S.Icon path={mdiArrowLeft} size="20px" />
      <S.Text>{children}</S.Text>
    </S.Container>
  );
};

export default LeftMenuBack;
