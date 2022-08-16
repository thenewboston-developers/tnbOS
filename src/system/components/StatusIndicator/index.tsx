import {mdiCircle} from '@mdi/js';
import Icon from '@mdi/react';

import {colors} from 'system/styles';
import {SFC} from 'system/types';
import * as S from './Styles';

export enum StatusIndicatorColor {
  gray = 'gray',
  green = 'green',
  red = 'red',
  yellow = 'yellow',
}

export interface StatusIndicatorProps {
  color: StatusIndicatorColor;
}

const StatusIndicator: SFC<StatusIndicatorProps> = ({color}) => {
  const getIconColor = () => {
    const iconColors = {
      [StatusIndicatorColor.gray]: colors.palette.gray['300'],
      [StatusIndicatorColor.green]: colors.palette.green['400'],
      [StatusIndicatorColor.red]: colors.palette.red['400'],
      [StatusIndicatorColor.yellow]: colors.palette.yellow['300'],
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

export default StatusIndicator;
