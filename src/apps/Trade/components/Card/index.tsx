import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface CardProps {
  children: ReactNode;
  padding?: number;
  title?: string;
}

const Card: SFC<CardProps> = ({children, className, padding, title}) => {
  return (
    <S.Card className={className} padding={padding}>
      {title ? <S.Title>{title}</S.Title> : null}
      {children}
    </S.Card>
  );
};

export default Card;
