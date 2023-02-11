import {ReactNode} from 'react';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface TopMenuItemProps {
  children: ReactNode;
  onClick: GenericVoidFunction;
}

const TopMenuItem: SFC<TopMenuItemProps> = ({children, className, onClick}) => {
  return (
    <S.Container className={className} onClick={onClick}>
      {children}
    </S.Container>
  );
};

export default TopMenuItem;
