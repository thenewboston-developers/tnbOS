import {SFC} from 'system/types';
import * as S from './Styles';

export interface LeftMenuTitleProps {
  children: string;
}

const LeftMenuTitle: SFC<LeftMenuTitleProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default LeftMenuTitle;
