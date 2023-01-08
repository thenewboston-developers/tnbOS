import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface CardLabelProps {
  children: ReactNode;
}

const CardLabel: SFC<CardLabelProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default CardLabel;
