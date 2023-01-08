import {SFC} from 'system/types';
import * as S from './Styles';

export interface BadgeProps {
  badgeStyle: BadgeStyle;
  text: string;
}

export enum BadgeStyle {
  danger = 'danger',
  dark = 'dark',
  darkLight = 'darkLight',
  info = 'info',
  primary = 'primary',
  success = 'success',
  warning = 'warning',
}

const Badge: SFC<BadgeProps> = ({badgeStyle, className, text}) => {
  return (
    <S.Container badgeStyle={badgeStyle} className={className}>
      {text}
    </S.Container>
  );
};

export default Badge;
