import {SFC} from 'system/types';
import * as S from './Styles';

export interface MenuItemProps {
  children: string;
  icon: string;
  isActivePage: boolean;
}

const MenuItem: SFC<MenuItemProps> = ({children, className, icon, isActivePage}) => {
  return (
    <S.Container className={className} $isActivePage={isActivePage}>
      <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage}>{children}</S.Text>
    </S.Container>
  );
};

export default MenuItem;
