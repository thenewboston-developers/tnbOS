import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuTitleProps {
  children: string;
  isCollapsed: boolean;
}

const LeftMenuTitle: SFC<LeftMenuTitleProps> = ({children, className, isCollapsed}) => {
  if (isCollapsed) return null;

  return <S.Container className={className}>{children}</S.Container>;
};

export default LeftMenuTitle;
