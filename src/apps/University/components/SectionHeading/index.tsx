import {ReactNode} from 'react';

import Line from 'apps/University/components/Line';
import {SFC} from 'system/types';
import * as S from './Styles';

export interface SectionHeadingProps {
  heading: string;
  rightContent?: ReactNode;
}

const SectionHeading: SFC<SectionHeadingProps> = ({className, heading, rightContent}) => {
  return (
    <S.Container className={className}>
      <S.Contents>
        <S.Heading>{heading}</S.Heading>
        {rightContent ? rightContent : null}
      </S.Contents>
      <Line />
    </S.Container>
  );
};

export default SectionHeading;
