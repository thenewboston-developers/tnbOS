import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface SpacedItemsProps {
  leftContent: ReactNode;
  rightContent: ReactNode;
}

const SpacedItems: SFC<SpacedItemsProps> = ({className, leftContent, rightContent}) => {
  return (
    <S.Container className={className}>
      <S.Left>{leftContent}</S.Left>
      <S.Right>{rightContent}</S.Right>
    </S.Container>
  );
};

export default SpacedItems;
