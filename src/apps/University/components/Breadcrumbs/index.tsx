import {mdiChevronRight} from '@mdi/js';

import {SFC} from 'system/types';
import * as S from './Styles';

const Breadcrumbs: SFC = ({className}) => {
  return (
    <S.Container className={className}>
      <S.Item isActive={true}>tnbOS</S.Item>
      <S.Icon color="#999" path={mdiChevronRight} size="18px" />
      <S.Item>Introduction to tnbOS</S.Item>
    </S.Container>
  );
};

export default Breadcrumbs;
