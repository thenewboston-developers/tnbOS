import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuItemProps {
  children: string;
  icon: string;
  isActivePage: boolean;
  isCollapsed: boolean;
  onClick: GenericVoidFunction;
}

const LeftMenuItem: SFC<LeftMenuItemProps> = ({children, className, icon, isActivePage, isCollapsed, onClick}) => {
  return (
    <S.Container $isActivePage={isActivePage} $isCollapsed={isCollapsed} className={className} onClick={onClick}>
      <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage} $isCollapsed={isCollapsed}>
        {children}
      </S.Text>
    </S.Container>
  );
};

export default LeftMenuItem;
