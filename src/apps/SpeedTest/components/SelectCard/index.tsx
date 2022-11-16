import {ReactNode} from 'react';

import {GenericVoidFunction} from 'shared/types';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface SelectCardProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: GenericVoidFunction;
}

const SelectCard: SFC<SelectCardProps> = ({children, className, isSelected, onClick}) => {
  return (
    <S.Container className={className} isSelected={isSelected} onClick={onClick}>
      {children}
    </S.Container>
  );
};

export default SelectCard;
