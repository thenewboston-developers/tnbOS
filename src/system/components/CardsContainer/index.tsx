import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface CardsContainerProps {
  children: ReactNode;
}

const CardsContainer: SFC<CardsContainerProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default CardsContainer;
