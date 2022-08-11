import {mdiCircle} from '@mdi/js';
import Icon from '@mdi/react';

import {colors} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export enum OnlineIndicatorColor {
  gray = 'gray',
  green = 'green',
  red = 'red',
  yellow = 'yellow',
}

export interface OnlineIndicatorProps {
  color: OnlineIndicatorColor;
}

const OnlineIndicator: SFC<OnlineIndicatorProps> = ({color}) => {
  const getIconColor = () => {
    const iconColors = {
      [OnlineIndicatorColor.gray]: colors.palette.gray['300'],
      [OnlineIndicatorColor.green]: colors.palette.green['400'],
      [OnlineIndicatorColor.red]: colors.palette.red['400'],
      [OnlineIndicatorColor.yellow]: colors.palette.yellow['300'],
    };
    return iconColors[color];
  };

  return (
    <>
      <S.Outer>
        <Icon color="white" path={mdiCircle} size="14px" />
      </S.Outer>
      <S.Inner>
        <Icon color={getIconColor()} path={mdiCircle} size="10px" />
      </S.Inner>
    </>
  );
};

export default OnlineIndicator;
