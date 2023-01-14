import {ReactNode} from 'react';

import {SFC} from 'system/types';
import * as S from './Styles';

export interface SectionHeadingProps {
  heading: string;
  rightContent?: ReactNode;
}

const SectionHeading: SFC<SectionHeadingProps> = ({className, heading, rightContent}) => {
  return (
    <S.Container className={className}>
      <S.Heading>{heading}</S.Heading>
      {rightContent ? rightContent : null}
    </S.Container>
  );
};

export default SectionHeading;
