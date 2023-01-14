import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuItemProps {
  children: string;
  icon: string;
  isActivePage: boolean;
  onClick: GenericVoidFunction;
}

const LeftMenuItem: SFC<LeftMenuItemProps> = ({children, className, icon, isActivePage, onClick}) => {
  return (
    <S.Container $isActivePage={isActivePage} className={className} onClick={onClick}>
      <S.Icon $isActivePage={isActivePage} path={icon} size="20px" />
      <S.Text $isActivePage={isActivePage}>{children}</S.Text>
    </S.Container>
  );
};

export default LeftMenuItem;
