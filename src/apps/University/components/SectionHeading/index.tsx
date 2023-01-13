import {SFC} from 'system/types';
import * as S from './Styles';

export interface SectionHeadingProps {
  heading: string;
}

const SectionHeading: SFC<SectionHeadingProps> = ({className, heading}) => {
  return <S.Container className={className}>{heading}</S.Container>;
};

export default SectionHeading;
