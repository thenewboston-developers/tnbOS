import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface TopCardProps {
  children: ReactNode;
  heading: string;
}

const TopCard: SFC<TopCardProps> = ({children, className, heading}) => {
  return (
    <S.Container className={className}>
      <S.Heading>{heading}</S.Heading>
      <S.Content>{children}</S.Content>
    </S.Container>
  );
};

export default TopCard;
