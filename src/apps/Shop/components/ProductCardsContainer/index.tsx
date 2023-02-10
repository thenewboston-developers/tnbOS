import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface ProductCardsContainerProps {
  children: ReactNode;
}

const ProductCardsContainer: SFC<ProductCardsContainerProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default ProductCardsContainer;
