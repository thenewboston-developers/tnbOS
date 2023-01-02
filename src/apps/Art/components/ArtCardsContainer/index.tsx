import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface ArtCardsContainerProps {
  children: ReactNode;
}

const ArtCardsContainer: SFC<ArtCardsContainerProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default ArtCardsContainer;
