import {CSSProperties, ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface MenuProps {
  children: ReactNode;
  style: CSSProperties | undefined;
}

const Menu: SFC<MenuProps> = ({children, className, style}) => {
  return (
    <S.Container className={className} style={style}>
      {children}
    </S.Container>
  );
};

export default Menu;
