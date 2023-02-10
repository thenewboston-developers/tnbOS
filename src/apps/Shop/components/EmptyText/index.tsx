import {SFC} from 'system/types';
import * as S from './Styles';

export interface EmptyTextProps {
  children: string;
}

const EmptyText: SFC<EmptyTextProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default EmptyText;
